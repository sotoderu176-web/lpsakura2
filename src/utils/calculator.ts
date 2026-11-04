import { SimulationResult, SimulatorOptions } from '../types';

export const calculateFare = (options: SimulatorOptions): SimulationResult => {
  const tripMultiplier = options.isRoundTrip ? 2 : 1;

  // 1km = 500円
  const distanceFare = Math.round(options.distanceKm * 500) * tripMultiplier;
  
  // 予約料 500円
  const reservationFee = 500 * tripMultiplier;
  
  // 迎車料 500円
  const pickupFee = 500 * tripMultiplier;
  
  // 基本介助料 1,100円
  const basicCareFee = 1100 * tripMultiplier;

  // オプション介助
  const roomCareFee = options.needsRoomAssistance ? 1100 * tripMultiplier : 0;

  // 機材レンタル料
  let equipmentFee = 0;
  if (options.wheelchairType === 'reclining') {
    equipmentFee = 2200;
  } else if (options.wheelchairType === 'stretcher') {
    equipmentFee = 4400;
  }

  const subtotal = distanceFare + reservationFee + pickupFee + basicCareFee + roomCareFee + equipmentFee;

  // 助成券計算
  // 迎車助成券: 1,130円 / 回
  const pickupSubsidyDiscount = options.usePickupSubsidy ? 1130 * tripMultiplier : 0;

  // 福祉タクシー券: 500円券 & 100円券
  const taxiTicket500Discount = Math.max(0, options.ticket500Count || 0) * 500;
  const taxiTicket100Discount = Math.max(0, options.ticket100Count || 0) * 100;

  const totalDiscount = pickupSubsidyDiscount + taxiTicket500Discount + taxiTicket100Discount;

  const estimatedTotal = Math.max(0, subtotal - totalDiscount);

  return {
    distanceFare,
    reservationFee,
    pickupFee,
    basicCareFee,
    roomCareFee,
    equipmentFee,
    subtotal,
    pickupSubsidyDiscount,
    taxiTicket500Discount,
    taxiTicket100Discount,
    totalDiscount,
    estimatedTotal,
  };
};
