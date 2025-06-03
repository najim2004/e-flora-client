import { apiSlice } from '@/redux/apiSlice';

export const chatbotApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChatbotResponse: builder.query({
      query: (message) => `/api/chatbot?message=${message}`,
    }),
  }),
});

export const { useGetChatbotResponseQuery } = chatbotApiSlice;
