import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CropSuggestionResponse,
  CropUpdateDetails,
} from "../../../types/cropSuggestion";

// Define the state shape
interface CropSuggestionState {
  cropSuggestions: CropSuggestionResponse[];
}

// Initial state
const initialState: CropSuggestionState = {
  cropSuggestions: [],
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
          crop.cropDetails.status = details.status;
          crop.cropDetails.slug = details.slug;
        }
      }
    },
  },
});

// Export actions
export const { insertCropSuggestion, removeCropSuggestion, updateCropDetails } =
  cropSuggestionSlice.actions;

// Export reducer
export default cropSuggestionSlice.reducer;
