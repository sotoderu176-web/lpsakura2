import React, { useState } from 'react';
import { BookingFormData, ColorTheme, DesignTemplate, DevicePreview } from './types';
import { ShowcaseToolbar } from './components/ShowcaseToolbar';
import { BackgroundDecoration } from './components/BackgroundDecoration';
import { SiteHeader } from './components/SiteHeader';
import { HeroSection } from './components/HeroSection';
import { BusinessStylishView } from './components/BusinessStylishView';
import { ReasonsAndScenesSection } from './components/ReasonsAndScenesSection';
import { FareSimulator } from './components/FareSimulator';
import { CalendarAvailability } from './components/CalendarAvailability';
import { ServiceAreaSection } from './components/ServiceAreaSection';
import { BookingFormSection } from './components/BookingFormSection';
import { StaffAndTestimonialsSection } from './components/StaffAndTestimonialsSection';
import { GoogleMapSection } from './components/GoogleMapSection';
import { FaqSection } from './components/FaqSection';
import { SiteFooter } from './components/SiteFooter';
import { SimplePricingSection } from './components/SimplePricingSection';
import { SimpleCompanySection } from './components/SimpleCompanySection';
import { TechIntegrationGuideModal } from './components/TechIntegrationGuideModal';
import { IllustrationGuideModal } from './components/IllustrationGuideModal';
import { VercelExportModal } from './components/VercelExportModal';

export default function App() {
  const [template, setTemplate] = useState<DesignTemplate>('photo');
  const [colorTheme, setColorTheme] = useState<ColorTheme>('orange');
  const [devicePreview, setDevicePreview] = useState<DevicePreview>('responsive');
  const [companyName, setCompanyName] = useState<string>('〇〇介護タクシー');

  // モーダル管理
  const [isTechGuideOpen, setIsTechGuideOpen] = useState(false);
  const [isIllustrationGuideOpen, setIsIllustrationGuideOpen] = useState(false);
  const [isVercelExportOpen, setIsVercelExportOpen] = useState(false);

  // 予約フォームデータ
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: '',
    phone: '',
    email: '',
    date: '',
    time: '10:00',
    departure: '',
    destination: '',
    wheelchairType: 'standard',
    needsAssistance: false,
    notes: '',
    estimatedDistanceKm: 4.5,
    estimatedAmount: 0,
  });

  // シミュレーターから予約フォームへの適用
  const handleApplyToBooking = (
    distance: number,
    total: number,
    wheelchair: string,
    assistance: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      estimatedDistanceKm: distance,
      estimatedAmount: total,
      wheelchairType: wheelchair,
      needsAssistance: assistance,
    }));
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // シミュレーターからLINEへの適用
  const handleApplyToLine = (distance: number, total: number) => {
    setFormData((prev) => ({
      ...prev,
      estimatedDistanceKm: distance,
      estimatedAmount: total,
    }));
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // カレンダー枠選択からフォームへの適用
  const handleSelectSlot = (date: string, time: string) => {
    setFormData((prev) => ({
      ...prev,
      date,
      time,
    }));
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // デバイスプレビュー幅コンテナ（実機スマホでの画面崩壊を完全に防止）
  const getDeviceContainerClass = () => {
    switch (devicePreview) {
      case 'mobile':
        return 'w-full md:max-w-[420px] md:mx-auto md:shadow-2xl md:border-8 md:border-slate-800 md:rounded-[40px] md:my-6 overflow-hidden bg-white is-mobile-preview';
      case 'tablet':
        return 'w-full md:max-w-[800px] md:mx-auto md:shadow-2xl md:border-8 md:border-slate-800 md:rounded-[32px] md:my-6 overflow-hidden bg-white';
      case 'desktop':
        return 'w-full md:max-w-[1280px] md:mx-auto md:shadow-2xl md:border-4 md:border-slate-800 md:rounded-2xl md:my-6 overflow-hidden bg-white';
      case 'responsive':
      default:
        return 'w-full bg-white';
    }
  };

  const isSimplePlan = template === 'simple';

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans antialiased selection:bg-amber-300 selection:text-black">
      
      {/* プレゼンテーション・ツールバー（シンプルプラン・Vercel書き出し完備） */}
      <ShowcaseToolbar
        template={template}
        onTemplateChange={setTemplate}
        colorTheme={colorTheme}
        onColorThemeChange={setColorTheme}
        devicePreview={devicePreview}
        onDevicePreviewChange={setDevicePreview}
        companyName={companyName}
        onCompanyNameChange={setCompanyName}
        onOpenTechGuide={() => setIsTechGuideOpen(true)}
        onOpenIllustrationGuide={() => setIsIllustrationGuideOpen(true)}
        onOpenVercelExport={() => setIsVercelExportOpen(true)}
      />

      {/* プレビュー枠 */}
      <div className={`flex-1 transition-all duration-300 relative ${getDeviceContainerClass()}`}>
        
        {/* 背景装飾 */}
        <BackgroundDecoration colorTheme={colorTheme} template={template} />

        {/* サイトヘッダー */}
        <SiteHeader
          template={template}
          colorTheme={colorTheme}
          companyName={companyName}
        />

        {/* メインコンテンツ */}
        <main className="relative z-10 pb-16 md:pb-0">
          
          {/* ヒーローセクション */}
          {template === 'business' ? (
            <BusinessStylishView
              companyName={companyName}
              colorTheme={colorTheme}
              onOpenBooking={() => {
                const el = document.getElementById('booking');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenSimulator={() => {
                const el = document.getElementById('simulator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          ) : (
            <HeroSection
              template={template}
              colorTheme={colorTheme}
              companyName={companyName}
            />
          )}

          {/* 選ばれる3つの理由 ＆ ご利用の流れ（全プラン共通基本） */}
          <ReasonsAndScenesSection
            template={template}
            colorTheme={colorTheme}
          />

          {/* ⑤ 対応エリア可視化マップ（全プラン共通基本） */}
          <ServiceAreaSection
            template={template}
            colorTheme={colorTheme}
          />

          {/* 【シンプルプラン】の時は追加オプション6機能を除外した基本構成を表示 */}
          {isSimplePlan ? (
            <>
              {/* 基本料金プラン表（シミュレーターなし） */}
              <SimplePricingSection colorTheme={colorTheme} />

              {/* 基本会社概要（Googleマップ埋め込みなし） */}
              <SimpleCompanySection colorTheme={colorTheme} companyName={companyName} />
            </>
          ) : (
            <>
              {/* 【追加オプション 1】 料金シミュレーション（目安金額の把握） */}
              <FareSimulator
                template={template}
                colorTheme={colorTheme}
                onApplyToBooking={handleApplyToBooking}
                onApplyToLine={handleApplyToLine}
              />

              {/* 【追加オプション 2】 運行時間帯・カレンダー */}
              <CalendarAvailability
                template={template}
                colorTheme={colorTheme}
                onSelectSlot={handleSelectSlot}
              />

              {/* 【追加オプション 3】 WEBメール予約 ＆ LINE簡単申込み */}
              <BookingFormSection
                template={template}
                colorTheme={colorTheme}
                companyName={companyName}
                formData={formData}
                onFormDataChange={setFormData}
              />

              {/* 【追加オプション 4 & 5】 スタッフ紹介 ＆ お客様の声 */}
              <StaffAndTestimonialsSection
                template={template}
                colorTheme={colorTheme}
              />

              {/* 【追加オプション 6】 会社概要 ＆ Googleマップ案内 */}
              <GoogleMapSection
                template={template}
                colorTheme={colorTheme}
                companyName={companyName}
              />
            </>
          )}

          {/* ⑦ よくある質問 FAQアコーディオン（全プラン共通） */}
          <FaqSection
            template={template}
            colorTheme={colorTheme}
          />
        </main>

        {/* サイトフッター */}
        <SiteFooter
          template={template}
          colorTheme={colorTheme}
          companyName={companyName}
        />

      </div>

      {/* ガイドモーダル */}
      <TechIntegrationGuideModal
        isOpen={isTechGuideOpen}
        onClose={() => setIsTechGuideOpen(false)}
      />

      <IllustrationGuideModal
        isOpen={isIllustrationGuideOpen}
        onClose={() => setIsIllustrationGuideOpen(false)}
      />

      {/* Vercelデプロイ用ZIP・ファイル一括ダウンロードモーダル（ご要望⑩） */}
      <VercelExportModal
        isOpen={isVercelExportOpen}
        onClose={() => setIsVercelExportOpen(false)}
      />

    </div>
  );
}
