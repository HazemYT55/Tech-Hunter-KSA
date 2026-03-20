export interface DeviceSpecs {
  ram: string;
  storage: string;
  processor: string;
  battery: string;
  display?: string;
  camera?: string;
}

export interface StoreLink {
  name: 'Amazon.sa' | 'Noon' | 'Jarir Bookstore' | 'Extra';
  url: string;
}

export interface DeviceRecommendation {
  id: string;
  name: string;
  type: 'phone' | 'laptop' | 'tablet' | 'other';
  priceSAR: number;
  specs: DeviceSpecs;
  pros: string[];
  cons: string[];
  isBestValue: boolean;
  stores: StoreLink[];
  imageUrl?: string;
}

export interface MissionUpdate {
  completed: boolean;
  pointsEarned: number;
  message: string;
}

export interface AIResponse {
  message: string;
  recommendations?: DeviceRecommendation[];
  missionUpdate?: MissionUpdate;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  recommendations?: DeviceRecommendation[];
  missionUpdate?: MissionUpdate;
  timestamp: Date;
}

export interface UserProfile {
  points: number;
  level: number;
  completedMissions: string[];
}
