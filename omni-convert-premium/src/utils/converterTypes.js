import { Ruler, Scale, Box, Cpu, Thermometer, Coins } from "lucide-react";

export const STATIC_CATEGORIES = {
  length: {
    title: "Length & Distance",
    icon: Ruler,
    isSpecial: false,
    units: {
      in: { name: "Inches (in)", factor: 0.0254 },
      cm: { name: "Centimetres (cm)", factor: 0.01 },
      mm: { name: "Millimetres (mm)", factor: 0.001 },
      m: { name: "Metres (m)", factor: 1 },
      km: { name: "Kilometres (km)", factor: 1000 },
      mi: { name: "Miles (mi)", factor: 1609.344 },
      yd: { name: "Yards (yd)", factor: 0.9144 },
      ft: { name: "Feet (ft)", factor: 0.3048 },
    },
  },
  weight: {
    title: "Weight & Mass",
    icon: Scale,
    isSpecial: false,
    units: {
      kg: { name: "Kilograms (kg)", factor: 1 },
      g: { name: "Grams (g)", factor: 0.001 },
      lb: { name: "Pounds (lbs)", factor: 0.45359237 },
      oz: { name: "Ounces (oz)", factor: 0.028349523 },
    },
  },
  volume: {
    title: "Volume & Capacity",
    icon: Box,
    isSpecial: false,
    units: {
      litres: { name: "Litres (L)", factor: 1 },
      ml: { name: "Millilitres (ml)", factor: 0.001 },
      gal_us: { name: "Gallons (US gal)", factor: 3.78541 },
      cup: { name: "Cups", factor: 0.236588 },
    },
  },
  digital: {
    title: "Digital Storage",
    icon: Cpu,
    isSpecial: false,
    units: {
      bits: { name: "Bits (b)", factor: 0.125 },
      bytes: { name: "Bytes (B)", factor: 1 },
      kb: { name: "Kilobytes (KB)", factor: 1000 },
      kib: { name: "Kibibytes (KiB)", factor: 1024 },
      mb: { name: "Megabytes (MB)", factor: 1000000 },
      gb: { name: "Gigabytes (GB)", factor: 1000000000 },
    },
  },
  temperature: {
    title: "Temperature",
    icon: Thermometer,
    isSpecial: true,
    units: {
      c: { name: "Celsius (°C)" },
      f: { name: "Fahrenheit (°F)" },
      k: { name: "Kelvin (K)" },
    },
  },
};

export const FINANCE_METADATA = {
  title: "Live Finance Forex & Crypto",
  icon: Coins,
  baseUnit: "GBP",
};
