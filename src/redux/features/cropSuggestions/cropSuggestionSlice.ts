import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CropSuggestionResponse,
  CropUpdateDetails,
} from "../../../types/cropSuggestion";

interface Location {
  latitude: number;
  longitude: number;
}

interface CropSuggestionHistory {
  location: Location;
  _id: string;
  soilType: string;
  farmSize: number;
  irrigationAvailability: string;
  createdAt: string;
}

// Define the state shape
interface CropSuggestionState {
  cropSuggestions: CropSuggestionResponse[];
  history: CropSuggestionHistory[];
}

// Initial state
const initialState: CropSuggestionState = {
  cropSuggestions: [],
  history: [],
};

// Create the slice
const cropSuggestionSlice = createSlice({
  name: "cropSuggestion",
  initialState,
  reducers: {
    // Add a new crop suggestion
    insertCropSuggestion: (
      state,
      action: PayloadAction<CropSuggestionResponse>
    ) => {
      const exitingCropIndex = state.cropSuggestions.findIndex(
        (c) => c._id === action.payload._id
      );
      if (exitingCropIndex !== -1) {
        state.cropSuggestions.splice(exitingCropIndex, 1, action.payload);
      } else {
        state.cropSuggestions.push(action.payload);
      }
    },

    // Remove a crop suggestion by ID
    removeCropSuggestion: (state, action: PayloadAction<string>) => {
      state.cropSuggestions = state.cropSuggestions.filter(
        (crop) => crop._id !== action.payload
      );
    },

    // Update crop details
    updateCropDetails: (
      state,
      action: PayloadAction<{ id: string; details: CropUpdateDetails }>
    ) => {
      const { id, details } = action.payload;
      const cropSuggestion = state.cropSuggestions.find((c) => c._id === id);

      if (cropSuggestion) {
        const crop = cropSuggestion.recommendations.crops.find(
          (c) => c.scientificName === details.scientificName
        );

        if (crop) {
          // Initialize cropDetails if it doesn't exist
          if (!crop.cropDetails) {
            crop.cropDetails = {
              status: details.status,
              slug: details.slug,
            };
          } else {
            // Update existing cropDetails
            crop.cropDetails.status = details.status;
            crop.cropDetails.slug = details.slug;
          }
        }
      }
    },
    // Set history data
    setHistory: (state, action: PayloadAction<CropSuggestionHistory[]>) => {
      state.history = [...state.history, ...action.payload];
    },
  },
});

// Export actions
export const {
  insertCropSuggestion,
  removeCropSuggestion,
  updateCropDetails,
  setHistory,
} = cropSuggestionSlice.actions;

// Export reducer
export default cropSuggestionSlice.reducer;
