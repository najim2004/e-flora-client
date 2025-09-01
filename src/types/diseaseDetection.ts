export interface DiseaseDetectionResult {
  success: boolean;
  message: string;
  data: {
    image: {
      url: string;
      id: string;
    };
    detectedDisease: {
      status: string;
      _id: string;
      cropName: string;
      diseaseName: string;
      description: string;
      symptoms: string[];
      treatment: string[];
      causes: string[];
      preventiveTips: string[];
    };
    _id: string;
    cropName: string;
    description: string | null;
    cta?: boolean;
    gardenId?: string;
    cropId?: string;
  };
}
