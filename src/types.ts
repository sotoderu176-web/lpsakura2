export type DesignTemplate = 'photo' | 'illustration' | 'business' | 'friendly' | 'simple';

export type ColorTheme = 'orange' | 'pink' | 'green' | 'blue';

export type DevicePreview = 'responsive' | 'desktop' | 'tablet' | 'mobile';

export interface SimulatorOptions {
  distanceKm: number;
  isRoundTrip: boolean;
  needsRoomAssistance: boolean; // 室内・段差介助 (+1,100円)
  wheelchairType: 'standard' | 'reclining' | 'stretcher'; // 標準(0円), リクライニング(+2,200円), ストレッチャー(+4,400円)
  usePickupSubsidy: boolean; // 迎車料助成券 (1,130円控除)
  ticket500Count: number; // 500円福祉タクシー券枚数
  ticket100Count: number; // 100円福祉タクシー券枚数
}

export interface SimulationResult {
  distanceFare: number;
  reservationFee: number;
  pickupFee: number;
  basicCareFee: number;
  roomCareFee: number;
  equipmentFee: number;
  subtotal: number;
  pickupSubsidyDiscount: number;
  taxiTicket500Discount: number;
  taxiTicket100Discount: number;
  totalDiscount: number;
  estimatedTotal: number;
}

export interface BookingFormData {
  customerName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  departure: string;
  destination: string;
  wheelchairType: string;
  needsAssistance: boolean;
  notes: string;
  estimatedDistanceKm: number;
  estimatedAmount: number;
}

export type SlotStatus = '◯' | '△' | '✕' | '休';

export interface CalendarSlotData {
  timeLabel: string;
  timeVal: string;
  status: SlotStatus;
  note?: string;
}

export interface CalendarDayData {
  dateStr: string;
  fullDateVal: string;
  isSunday: boolean;
  isSaturday: boolean;
  slots: CalendarSlotData[];
}
