import React, { useState, useEffect } from 'react';
import { ColorTheme, DesignTemplate, CalendarDayData, SlotStatus } from '../types';
import { themeColors } from '../utils/themeStyles';

interface CalendarAvailabilityProps {
  template: DesignTemplate;
  colorTheme: ColorTheme;
  onSelectSlot: (date: string, time: string) => void;
  isAdminUnlocked?: boolean;
  onToggleAdminUnlocked?: (unlocked: boolean) => void;
}

export const CalendarAvailability: React.FC<CalendarAvailabilityProps> = ({
  template,
  colorTheme,
  onSelectSlot,
  isAdminUnlocked: propIsAdminUnlocked,
  onToggleAdminUnlocked,
}) => {
  const currentTheme = themeColors[colorTheme];

  // 表示モード：内部カレンダー vs Googleカレンダー埋め込み
  const [viewMode, setViewMode] = useState<'internal' | 'gcal'>('internal');

  // ホスト管理者認証ステート（URLパラメータ ?admin=true または PIN入力 でアンロック）
  const [localAdminUnlocked, setLocalAdminUnlocked] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true' || params.get('mode') === 'admin') return true;
      return localStorage.getItem('kaigo_taxi_admin_unlocked') === 'true';
    }
    return false;
  });

  const isAdminUnlocked = propIsAdminUnlocked ?? localAdminUnlocked;

  // ホスト編集モードトグル
  const [isHostMode, setIsHostMode] = useState<boolean>(false);
  const [hostNotice, setHostNotice] = useState<string>('');

  // PIN入力モーダル
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  // Googleカレンダー連携設定
  const [googleCalendarId, setGoogleCalendarId] = useState<string>(() => {
    return localStorage.getItem('kaigo_taxi_gcal_id') || 'ja.japanese#holiday@group.v.calendar.google.com';
  });

  // 電話予約受付用入力ステート
  const [phoneBookingDate, setPhoneBookingDate] = useState<string>('');
  const [phoneBookingSlotIdx, setPhoneBookingSlotIdx] = useState<number>(0);
  const [phoneBookingStatus, setPhoneBookingStatus] = useState<SlotStatus>('✕');
  const [phoneBookingNote, setPhoneBookingNote] = useState<string>('電話受付: 〇〇様（東邦大病院往復）');

  // カレンダー基本データの初期生成関数
  const generateInitialSchedule = (): CalendarDayData[] => {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    const today = new Date();

    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayOfWeek = days[d.getDay()];
      const dateStr = `${d.getMonth() + 1}/${d.getDate()} (${dayOfWeek})`;
      const fullDateVal = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

      // デフォルトサンプル空き状況
      const morningStatus: SlotStatus = i === 2 ? '△' : i === 5 ? '✕' : '◯';
      const afternoonStatus: SlotStatus = i === 1 ? '△' : i === 6 ? '△' : '◯';
      const eveningStatus: SlotStatus = i === 3 ? '✕' : '◯';

      return {
        dateStr,
        fullDateVal,
        isSunday: d.getDay() === 0,
        isSaturday: d.getDay() === 6,
        slots: [
          { timeLabel: '午前 (7:00〜12:00)', timeVal: '09:30', status: morningStatus },
          { timeLabel: '午後 (12:00〜16:00)', timeVal: '13:30', status: afternoonStatus },
          { timeLabel: '夕方 (16:00〜19:00)', timeVal: '17:00', status: eveningStatus },
        ],
      };
    });
  };

  const [schedule, setSchedule] = useState<CalendarDayData[]>(() => {
    const saved = localStorage.getItem('kaigo_taxi_calendar_slots_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return generateInitialSchedule();
  });

  useEffect(() => {
    if (schedule.length > 0 && !phoneBookingDate) {
      setPhoneBookingDate(schedule[0].fullDateVal);
    }
  }, [schedule, phoneBookingDate]);

  // ローカルストレージへ保存
  const saveSchedule = (updated: CalendarDayData[]) => {
    setSchedule(updated);
    try {
      localStorage.setItem('kaigo_taxi_calendar_slots_v2', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  // PIN認証処理
  const handleVerifyPin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pinInput === '1234' || pinInput === 'admin') {
      setLocalAdminUnlocked(true);
      if (onToggleAdminUnlocked) onToggleAdminUnlocked(true);
      setIsHostMode(true);
      setIsPinModalOpen(false);
      setPinInput('');
      setPinError('');
      try {
        localStorage.setItem('kaigo_taxi_admin_unlocked', 'true');
      } catch (err) {}
    } else {
      setPinError('暗証番号が正しくありません（初期設定PIN: 1234）');
    }
  };

  // 管理者ログアウト
  const handleLogoutAdmin = () => {
    setLocalAdminUnlocked(false);
    if (onToggleAdminUnlocked) onToggleAdminUnlocked(false);
    setIsHostMode(false);
    try {
      localStorage.removeItem('kaigo_taxi_admin_unlocked');
    } catch (err) {}
  };

  // 枠クリックでステータスを順送り（ホスト編集モード時のみ）
  const handleSlotClickInHostMode = (dayIdx: number, slotIdx: number) => {
    const nextStatusMap: Record<SlotStatus, SlotStatus> = {
      '◯': '△',
      '△': '✕',
      '✕': '休',
      '休': '◯',
    };

    const updated = [...schedule];
    const current = updated[dayIdx].slots[slotIdx].status;
    const next = nextStatusMap[current] || '◯';
    updated[dayIdx].slots[slotIdx].status = next;
    saveSchedule(updated);

    setHostNotice(`[${updated[dayIdx].dateStr} ${updated[dayIdx].slots[slotIdx].timeLabel}] の状態を「${next}」に変更しました`);
    setTimeout(() => setHostNotice(''), 3000);
  };

  // 電話予約をカレンダーに直接反映
  const handleApplyPhoneBooking = () => {
    const updated = [...schedule];
    const targetDay = updated.find((d) => d.fullDateVal === phoneBookingDate);
    if (!targetDay) return;

    targetDay.slots[phoneBookingSlotIdx].status = phoneBookingStatus;
    targetDay.slots[phoneBookingSlotIdx].note = phoneBookingNote;

    saveSchedule(updated);
    setHostNotice(`電話予約を反映しました: ${targetDay.dateStr} [${phoneBookingStatus}] ${phoneBookingNote}`);
    setTimeout(() => setHostNotice(''), 4000);
  };

  // Googleカレンダーに予定を登録するリンクを生成
  const generateGoogleCalendarUrl = (dateStr: string, slotIdx: number, noteText: string) => {
    const timeRanges = [
      { start: '090000', end: '120000' },
      { start: '130000', end: '160000' },
      { start: '160000', end: '190000' },
    ];
    const range = timeRanges[slotIdx] || timeRanges[0];
    const cleanDate = dateStr.replace(/-/g, '');
    const startIso = `${cleanDate}T${range.start}`;
    const endIso = `${cleanDate}T${range.end}`;

    const title = encodeURIComponent(`【介護タクシー配車】${noteText || '電話予約分'}`);
    const details = encodeURIComponent(`運行カレンダー電話受付予約\n日時: ${dateStr}\n詳細メモ: ${noteText}\n配車管理用`);
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=%E4%B8%96%E7%94%B0%E8%B0%B7%E5%8C%BA`;
  };

  // カレンダーを初期状態にリセット
  const handleResetSchedule = () => {
    if (window.confirm('カレンダーの空き枠を初期状態に戻しますか？')) {
      const initial = generateInitialSchedule();
      saveSchedule(initial);
      setHostNotice('カレンダーを初期状態にリセットしました');
      setTimeout(() => setHostNotice(''), 3000);
    }
  };

  return (
    <section id="calendar" className={`py-16 px-4 scroll-mt-20 ${
      template === 'friendly' ? 'bg-[#fffcf7] text-amber-950 border-t border-amber-200' : 'bg-white text-slate-800'
    }`}>
      <div className="max-w-5xl mx-auto">
        
        {/* 見出し ＆ 追加オプション明記バッジ */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black tracking-wider shadow-sm">
              【追加オプション機能】
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentTheme.tagBg}`}>
              {template === 'business' ? '⑥ REALTIME AVAILABILITY' : '⑥ 運行スケジュール・空き状況'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
            対応可能時間帯・運行カレンダー
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            運行時間帯（7:00〜19:00）の空き枠（◯または△）をクリックすると、そのまま予約フォームへ自動入力されます。電話受付による満車状況もリアルタイムで更新・同期が可能です。
          </p>
        </div>

        {/* 管理者モード認証中の通知バー（一般客には非表示） */}
        {isAdminUnlocked && (
          <div className="mb-4 p-3 rounded-2xl bg-amber-100 border-2 border-amber-400 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-amber-950 shadow-sm animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔓</span>
              <span>
                <strong>【ホスト管理者モード有効中】</strong>
                （一般のWeb訪問客にはこの管理バーや編集ボタンは一切表示されません）
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsHostMode(!isHostMode)}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black cursor-pointer shadow-xs transition-colors"
              >
                {isHostMode ? '編集パネルを閉じる' : '⚙️ 編集パネルを開く'}
              </button>
              <button
                type="button"
                onClick={handleLogoutAdmin}
                className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-rose-700 border border-amber-300 font-bold cursor-pointer"
              >
                管理者ログアウト
              </button>
            </div>
          </div>
        )}

        {/* コントロールバー：表示切り替え（内部カレンダー vs Googleカレンダー） */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
          
          {/* 表示タブ切り替え */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/80 text-xs font-bold">
            <button
              type="button"
              onClick={() => setViewMode('internal')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'internal'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>📅</span>
              <span>自社運行枠カレンダー</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('gcal')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'gcal'
                  ? 'bg-white text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🔗</span>
              <span>Googleカレンダー連携表示</span>
            </button>
          </div>

          {/* 管理者認証時のみ表示される編集ボタン */}
          {isAdminUnlocked && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsHostMode(!isHostMode)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                  isHostMode
                    ? 'bg-amber-500 text-slate-950 border-2 border-amber-600'
                    : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300'
                }`}
              >
                <span>⚙️</span>
                <span>{isHostMode ? '編集中（完了）' : '空き枠を編集'}</span>
              </button>
            </div>
          )}
        </div>

        {/* ホスト編集モード有効時の管理操作パネル */}
        {isAdminUnlocked && isHostMode && (
          <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-4 shadow-md animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛠️</span>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-amber-950">
                    管理者・ホスト専用 空き枠更新パネル
                  </h3>
                  <p className="text-xs text-amber-800">
                    電話で入った予約を反映したり、急な配車受付不可（満車・運休）をワンクリックで更新できます。
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleResetSchedule}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition-colors cursor-pointer"
              >
                初期カレンダーにリセット
              </button>
            </div>

            {/* 電話予約の即時反映フォーム */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end bg-white/90 p-4 rounded-xl border border-amber-200">
              
              <div className="md:col-span-3">
                <label className="block text-xs font-bold text-slate-700 mb-1">① 対象日</label>
                <select
                  value={phoneBookingDate}
                  onChange={(e) => setPhoneBookingDate(e.target.value)}
                  className="w-full p-2 text-xs font-bold rounded-lg border border-slate-300 bg-white"
                >
                  {schedule.map((day) => (
                    <option key={day.fullDateVal} value={day.fullDateVal}>
                      {day.dateStr}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-bold text-slate-700 mb-1">② 時間帯</label>
                <select
                  value={phoneBookingSlotIdx}
                  onChange={(e) => setPhoneBookingSlotIdx(Number(e.target.value))}
                  className="w-full p-2 text-xs font-bold rounded-lg border border-slate-300 bg-white"
                >
                  <option value={0}>午前 (7:00〜12:00)</option>
                  <option value={1}>午後 (12:00〜16:00)</option>
                  <option value={2}>夕方 (16:00〜19:00)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">③ 状態変更</label>
                <select
                  value={phoneBookingStatus}
                  onChange={(e) => setPhoneBookingStatus(e.target.value as SlotStatus)}
                  className="w-full p-2 text-xs font-bold rounded-lg border border-slate-300 bg-white"
                >
                  <option value="✕">✕ 満車 (電話予約済)</option>
                  <option value="△">△ 要相談 (残1台)</option>
                  <option value="◯">◯ 空き枠 (予約可)</option>
                  <option value="休">休 運休・定休</option>
                </select>
              </div>

              <div className="md:col-span-4 flex gap-2">
                <input
                  type="text"
                  value={phoneBookingNote}
                  onChange={(e) => setPhoneBookingNote(e.target.value)}
                  placeholder="電話受付メモ (例: 〇〇様 東邦大病院)"
                  className="flex-1 p-2 text-xs rounded-lg border border-slate-300 bg-white font-medium"
                />
                <button
                  type="button"
                  onClick={handleApplyPhoneBooking}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs whitespace-nowrap shadow cursor-pointer transition-all"
                >
                  反映する
                </button>
              </div>

            </div>

            {/* Googleカレンダーへこの予約を追加するワンクリックリンク */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-amber-100/60 p-3 rounded-xl border border-amber-200">
              <span className="font-bold text-amber-900">
                📲 電話予約を社内Googleカレンダーにも追加したい場合：
              </span>
              <a
                href={generateGoogleCalendarUrl(phoneBookingDate, phoneBookingSlotIdx, phoneBookingNote)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <span>📅</span>
                <span>この予約をGoogleカレンダーに追加 ↗</span>
              </a>
            </div>

            {/* ヒント案内 */}
            <div className="text-xs text-amber-900 leading-relaxed">
              💡 <strong>表のセルを直接クリック</strong>しても、即座に【◯ 空き ➜ △ 残1台 ➜ ✕ 満車 ➜ 休 運休】を切り替え可能です。設定内容は自動保存されます。
            </div>

            {hostNotice && (
              <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300 animate-pulse">
                ✓ {hostNotice}
              </div>
            )}
          </div>
        )}

        {/* 1. 内部カレンダー表示モード */}
        {viewMode === 'internal' && (
          <div>
            {/* 凡例 */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-6 text-xs font-bold">
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">◯</span>
                <span>予約可能（空車）</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">△</span>
                <span>残りわずか（要相談）</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold">✕</span>
                <span>満車（電話予約済）</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center font-bold">休</span>
                <span>運休・定休</span>
              </div>
            </div>

            {/* カレンダーテーブル本体 */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
              <table className="w-full text-center text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="p-3 text-left font-bold border-b border-r border-slate-200 whitespace-nowrap min-w-[120px]">
                      時間帯
                    </th>
                    {schedule.map((day) => (
                      <th
                        key={day.fullDateVal}
                        className={`p-3 font-bold border-b border-slate-200 min-w-[80px] ${
                          day.isSunday ? 'text-rose-600 bg-rose-50/50' : day.isSaturday ? 'text-blue-600 bg-blue-50/50' : ''
                        }`}
                      >
                        {day.dateStr}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {['午前 (7:00〜12:00)', '午後 (12:00〜16:00)', '夕方 (16:00〜19:00)'].map((slotName, slotIdx) => (
                    <tr key={slotName} className="border-b last:border-b-0 hover:bg-slate-50/60 transition-colors">
                      <td className="p-3 text-left font-bold text-slate-700 border-r border-slate-200 bg-slate-50/40 whitespace-nowrap">
                        {slotName}
                      </td>
                      {schedule.map((day, dayIdx) => {
                        const slot = day.slots[slotIdx];
                        const isAvailable = slot.status === '◯' || slot.status === '△';

                        return (
                          <td key={day.fullDateVal} className="p-2 border-r last:border-r-0 border-slate-200 relative">
                            {isAdminUnlocked && isHostMode ? (
                              // ホスト編集モード時のセルボタン（クリックで順送り切り替え）
                              <button
                                type="button"
                                onClick={() => handleSlotClickInHostMode(dayIdx, slotIdx)}
                                className={`w-full py-2.5 px-1 rounded-lg font-black text-sm border transition-all cursor-pointer hover:ring-2 hover:ring-amber-400 ${
                                  slot.status === '◯'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                    : slot.status === '△'
                                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                                    : slot.status === '休'
                                    ? 'bg-slate-200 text-slate-600 border-slate-300'
                                    : 'bg-rose-50 text-rose-700 border-rose-200'
                                }`}
                                title="クリックで状態を変更（◯ ➜ △ ➜ ✕ ➜ 休）"
                              >
                                <span>{slot.status}</span>
                                <span className="block text-[9px] text-slate-500 font-normal">✎切替</span>
                                {slot.note && (
                                  <span className="block text-[8px] truncate text-slate-600 mt-0.5" title={slot.note}>
                                    📌
                                  </span>
                                )}
                              </button>
                            ) : isAvailable ? (
                              // 一般ユーザー閲覧時：空き枠をクリックすると予約フォームへ自動入力
                              <button
                                type="button"
                                onClick={() => onSelectSlot(day.fullDateVal, slot.timeVal)}
                                className={`w-full py-2.5 rounded-lg font-black text-sm transition-all hover:scale-104 cursor-pointer shadow-xs ${
                                  slot.status === '◯'
                                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                                }`}
                                title="クリックしてこの日時で予約入力"
                              >
                                <span>{slot.status}</span>
                                <span className="block text-[9px] font-normal opacity-80">
                                  {slot.status === '◯' ? '空きあり' : '要相談'}
                                </span>
                              </button>
                            ) : (
                              // 満車または運休表示
                              <div className="py-2.5 text-center">
                                <span className="text-sm font-bold text-slate-400">
                                  {slot.status}
                                </span>
                                <span className="block text-[9px] text-slate-400">
                                  {slot.status === '休' ? '運休' : '満車'}
                                </span>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* カレンダー下部フッター案内 ＆ 管理者ログイン鍵 */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <p>
                ※ 上記以外の早朝（7:00以前）や夜間（19:00以降）、当日の急な配車要請はお電話（0120-XXX-XXX）にて24時間直接ご相談いただけます。
              </p>
              {!isAdminUnlocked && (
                <button
                  type="button"
                  onClick={() => setIsPinModalOpen(true)}
                  className="text-[11px] opacity-60 hover:opacity-100 hover:text-slate-800 underline transition-opacity cursor-pointer flex items-center gap-1"
                >
                  <span>🔒 運行管理者の方はこちら</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* 2. Googleカレンダー連携表示モード */}
        {viewMode === 'gcal' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 text-sky-950 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🔗</span>
                  <div>
                    <h3 className="font-bold text-base text-sky-950">
                      Googleカレンダー連携 ＆ リアルタイム同期
                    </h3>
                    <p className="text-xs text-sky-800">
                      社内で共有しているGoogleカレンダーの予定・空車枠をリアルタイムに埋め込み表示できます。
                    </p>
                  </div>
                </div>

                <a
                  href="https://calendar.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>Googleカレンダー公式を開く</span>
                  <span>↗</span>
                </a>
              </div>

              {/* カレンダーIDまたは公開URL入力 */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-sky-200">
                <label className="text-xs font-bold text-slate-700">
                  GoogleカレンダーID / 公開URL:
                </label>
                <input
                  type="text"
                  value={googleCalendarId}
                  onChange={(e) => {
                    setGoogleCalendarId(e.target.value);
                    localStorage.setItem('kaigo_taxi_gcal_id', e.target.value);
                  }}
                  placeholder="例: your-company-calendar@gmail.com"
                  className="flex-1 min-w-[240px] px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white font-medium"
                />
                <button
                  type="button"
                  onClick={() => {
                    setGoogleCalendarId('ja.japanese#holiday@group.v.calendar.google.com');
                    localStorage.setItem('kaigo_taxi_gcal_id', 'ja.japanese#holiday@group.v.calendar.google.com');
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold"
                >
                  デモ表示
                </button>
              </div>
            </div>

            {/* Googleカレンダー埋め込みiframe */}
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
              <iframe
                title="Googleカレンダー 運行スケジュール"
                src={`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(googleCalendarId)}&ctz=Asia%2FTokyo`}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>

            {/* Googleカレンダー連携マニュアル */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <h4 className="font-bold text-slate-800 text-sm mb-1">
                📖 Googleカレンダー連携の設定方法（3ステップ）：
              </h4>
              <ol className="list-decimal list-inside space-y-1 pl-1 leading-relaxed">
                <li>PCのGoogleカレンダーを開き、共有したいカレンダーの「設定と共有」をクリックします。</li>
                <li>「アクセス権限」で「一般公開して誰でも利用できるようにする」にチェックを入れます。</li>
                <li>「カレンダーの統合」項目にある「カレンダーID」を上記入力欄に貼り付けるだけで、この画面に自動連携されます。</li>
              </ol>
            </div>
          </div>
        )}

      </div>

      {/* 管理者ログインPIN認証モーダル */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 text-2xl flex items-center justify-center mx-auto mb-2">
                🔒
              </div>
              <h3 className="text-lg font-black text-slate-900">運行管理者ログイン</h3>
              <p className="text-xs text-slate-500 mt-1">
                電話予約の登録や空き枠の編集を行うための暗証番号を入力してください。
              </p>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-3">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="暗証番号（初期設定: 1234）"
                  autoFocus
                  className="w-full text-center tracking-widest text-lg font-mono p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold"
                />
                {pinError && (
                  <p className="text-xs text-rose-600 font-bold mt-1.5 text-center">
                    {pinError}
                  </p>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsPinModalOpen(false);
                    setPinInput('');
                    setPinError('');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow"
                >
                  認証する
                </button>
              </div>
            </form>

            <div className="p-2.5 rounded-lg bg-slate-50 text-[11px] text-slate-500 text-center border border-slate-200">
              💡 初期設定PINは <strong className="text-slate-800 font-mono">1234</strong> です。<br />
              URL末尾に <span className="font-mono text-amber-700">?admin=true</span> を付けてアクセスしても自動認証されます。
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
