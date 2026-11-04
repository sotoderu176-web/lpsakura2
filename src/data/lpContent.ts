export interface StaffMember {
  id: string;
  name: string;
  role: string;
  qualification: string;
  photoUrl: string;
  illustrationUrl: string;
  businessPhotoUrl: string;
  friendlyPhotoUrl: string;
  message: string;
  experienceYears: number;
}

export interface Testimonial {
  id: string;
  name: string;
  ageGroup: string;
  purpose: string;
  rating: number;
  date: string;
  comment: string;
  route: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'vehicle' | 'care' | 'pricing' | 'reservation';
}

export const defaultFaqItems: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'vehicle',
    question: '車椅子のまま乗車できますか？リクライニングやストレッチャーも可能ですか？',
    answer: 'はい。大型スロープおよび電動リフトを備えた福祉専用車両ですので、普段お使いの車椅子のまま無理なくご乗車いただけます。リクライニング車椅子や寝台ストレッチャーでのご乗車にも完全対応しております。',
  },
  {
    id: 'faq-2',
    category: 'care',
    question: '自宅の室内やベッドから車椅子への移乗介助もお願いできますか？',
    answer: 'はい。介護福祉士や実務者研修修了等の有資格スタッフが乗務しておりますので、お部屋のベッドから車椅子への移乗、玄関の段差昇降、病院内の診察室までの受付・付き添いまで一貫してお手伝いいたします。',
  },
  {
    id: 'faq-3',
    category: 'pricing',
    question: '自治体の迎車料助成券や福祉タクシー券は利用できますか？',
    answer: 'ご利用いただけます。1回あたり1,130円控除となる迎車料助成券や、100円券・500円券の福祉タクシー券に対応しております。ご乗車時またはご予約時にお知らせください。',
  },
  {
    id: 'faq-4',
    category: 'reservation',
    question: '当日の急な予約や夜間・早朝の利用も相談できますか？',
    answer: '当日の急な退院や受診でも、空車状況により最短20〜30分以内でお迎えに急行いたします。夜間・早朝や長距離の県外転院もお気軽にご相談ください。',
  },
  {
    id: 'faq-5',
    category: 'vehicle',
    question: '家族や付添人は何名まで同乗できますか？',
    answer: '車椅子1台（またはストレッチャー1台）のほかに、ご家族様やお付き添いの方2〜3名様までゆったりと同乗いただけます。荷物スペースも広く確保しております。',
  },
  {
    id: 'faq-6',
    category: 'pricing',
    question: '有料道路代や病院での待ち時間料金はどうなりますか？',
    answer: '高速道路・有料道路料金、有料駐車場代は実費負担となります。診察待ち等の待機を希望される場合は所定の待機料金にて承りますので、事前見積もり時にご案内いたします。',
  },
];

export const defaultStaffMembers: StaffMember[] = [
  {
    id: 'staff-1',
    name: '田中 健二',
    role: '運行統括責任者 / ケアドライバー',
    qualification: '介護福祉士 / 二種免許 / 患者等搬送乗務員適任証',
    photoUrl: '/public/assets/aistudio/illustration_staff_male_caregiver_1793583824530_cf88cf1c.jpg',
    illustrationUrl: '/public/assets/aistudio/illustration_staff_male_caregiver_1793583824530_cf88cf1c.jpg',
    businessPhotoUrl: '/public/assets/aistudio/photo_area2_hospital_driveway_1793586833281_eddbd899.jpg',
    friendlyPhotoUrl: '/public/assets/aistudio/illustration_staff_male_caregiver_1793583824530_cf88cf1c.jpg',
    message: '病院勤務の介護現場で培った身体介助の技術を活かし、揺れや段差の少ない安全運転で安心・快適な移動時間をお届けします。',
    experienceYears: 12,
  },
  {
    id: 'staff-2',
    name: '佐藤 美咲',
    role: 'ケアアテンダント / 看護連携スタッフ',
    qualification: '介護職員初任者研修 / 上級救命技能認定',
    photoUrl: '/src/assets/images/caregiver_female_staff_1793600087817.jpg',
    illustrationUrl: '/public/assets/aistudio/illustration_staff_female_caregiver_1793583825587_ce160ceb.jpg',
    businessPhotoUrl: '/src/assets/images/caregiver_female_staff_1793600087817.jpg',
    friendlyPhotoUrl: '/public/assets/aistudio/illustration_staff_female_caregiver_1793583825587_ce160ceb.jpg',
    message: '初めてご利用される患者様やご家族の不安を少しでも和らげられるよう、笑顔と思いやりのあるお声がけを大切にしています。',
    experienceYears: 8,
  },
  {
    id: 'staff-3',
    name: '高橋 健太郎',
    role: 'シニアドライバー / 安全運行管理者',
    qualification: '大型二種免許 / 運行管理者（旅客）',
    photoUrl: '/public/assets/aistudio/illustration_staff_senior_driver_1793583825286_567768cb.jpg',
    illustrationUrl: '/public/assets/aistudio/illustration_staff_senior_driver_1793583825286_567768cb.jpg',
    businessPhotoUrl: '/src/assets/images/business_night_transfer_1793597549639.jpg',
    friendlyPhotoUrl: '/public/assets/aistudio/illustration_staff_senior_driver_1793583825286_567768cb.jpg',
    message: '都内の主要幹線や住宅街の抜け道を知り尽くしています。お身体に響かない滑らかな加減速と細やかな配慮を徹底しています。',
    experienceYears: 20,
  },
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: 'voice-1',
    name: '世田谷区 S様 ご家族',
    ageGroup: '80代（要介護4のお母様）',
    purpose: '総合病院への定期通院・院内同行',
    rating: 5,
    date: '2026年10月ご利用',
    comment: '自宅2階の寝室から車椅子への移乗も2人がかりで手際よく対応していただき、本当に助かりました。病院の待ち時間も優しく見守ってくださり心強かったです。',
    route: 'ご自宅 ⇄ 東邦大学医療センター大橋病院',
  },
  {
    id: 'voice-2',
    name: '杉並区 K様 ご本人',
    ageGroup: '70代（車椅子利用）',
    purpose: 'お孫様の結婚披露宴へのご出席',
    rating: 5,
    date: '2026年9月ご利用',
    comment: 'リクライニング車椅子をお借りして式場まで往復しました。礼服の着崩れも気にかけてくださり、人生の大切な門出に家族全員で参加することができました。',
    route: '世田谷区 ⇄ 都内ホテル式場',
  },
  {
    id: 'voice-3',
    name: '目黒区 M様 ご家族',
    ageGroup: '80代（ストレッチャー搬送）',
    purpose: 'リハビリ病院への転院搬送',
    rating: 5,
    date: '2026年10月ご利用',
    comment: '民間救急レベルの清潔な寝台ストレッチャーで、点滴をしたまま安心して長距離移動できました。事前の電話説明から当日の段取りまで完璧でした。',
    route: '大学病院 ⇄ 神奈川県内リハビリ専門病院',
  },
];
