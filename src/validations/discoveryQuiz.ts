import { z } from "zod";

export const DiscoveryQuizSchema = z.object({
  step1Field: z.string().min(1, "Required"),
  step2Field: z.number().min(1, "Required"),
  // Add other fields as needed
});

export type TDiscoveryQuizSchema = z.infer<typeof DiscoveryQuizSchema>;
