import React from 'react';
import { ColorTheme, DesignTemplate } from '../types';
import { defaultStaffMembers, defaultTestimonials } from '../data/lpContent';
import { themeColors } from '../utils/themeStyles';

interface StaffAndTestimonialsSectionProps {
  template: DesignTemplate;
  colorTheme: ColorTheme;
}

export const StaffAndTestimonialsSection: React.FC<StaffAndTestimonialsSectionProps> = ({
  template,
  colorTheme,
}) => {
  const currentTheme = themeColors[colorTheme];

  const getStaffImage = (member: typeof defaultStaffMembers[0]) => {
    if (template === 'illustration' || template === 'friendly') {
      return member.illustrationUrl;
    }
    if (template === 'business') {
      return member.businessPhotoUrl;
    }
    return member.photoUrl;
  };

  return (
    <section id="staff" className={`py-16 px-4 ${
      template === 'friendly' ? 'bg-[#fffdf7] text-amber-950' : 'bg-white text-slate-800'
    }`}>
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* ⑧-1 スタッフ紹介セクション（追加オプション） */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black tracking-wider shadow-sm">
                【追加オプション機能】
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentTheme.tagBg}`}>
                {template === 'business' ? '⑧ STAFF INTRODUCTION' : '⑧ 乗務員・スタッフ紹介'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              プロフェッショナル乗務員・スタッフ紹介
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              介護福祉士や患者等搬送適任証を持つプロフェッショナルが、安全運転と温かい身体介助でお迎えいたします。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {defaultStaffMembers.map((staff) => (
              <div
                key={staff.id}
                className={`rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg transition-all w-full flex flex-col ${
                  template === 'friendly'
                    ? 'bg-[#fffdfa] border-amber-200'
                    : template === 'illustration'
                    ? 'bg-rose-50/40 border-rose-200'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={getStaffImage(staff)}
                    alt={staff.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2.5 right-2.5 px-3 py-1 rounded-full bg-slate-900/85 text-white font-bold text-xs tracking-wider shadow">
                    実務経験 {staff.experienceYears}年
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight whitespace-nowrap">
                        {staff.name}
                      </h3>
                      <span className="text-xs font-bold text-slate-700 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">
                        {staff.role}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 text-xs font-bold text-slate-800 border border-slate-200 mb-3 leading-relaxed">
                      保有資格: {staff.qualification}
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed font-normal">
                      「{staff.message}」
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ⑧-2 お客様の声セクション（追加オプション） */}
        <div id="testimonials" className="pt-10 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black tracking-wider shadow-sm">
                【追加オプション機能】
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentTheme.tagBg}`}>
                {template === 'business' ? 'VOICE OF CUSTOMERS' : '実際のご利用者の声'}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              実際にご利用いただいたお客様・ご家族の声
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              定期通院からご家族の慶事、急なリハビリ転院まで、多くの安心の声をいただいております。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {defaultTestimonials.map((voice) => (
              <div
                key={voice.id}
                className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between w-full"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-amber-500 text-base font-bold">
                      {'★'.repeat(voice.rating)}
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      {voice.date}
                    </span>
                  </div>

                  <div className="inline-block px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
                    利用目的: {voice.purpose}
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    「{voice.comment}」
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1 text-xs sm:text-sm text-slate-600">
                  <span className="font-bold text-slate-900">{voice.name}</span>
                  <span className="text-xs text-slate-500">{voice.route}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
