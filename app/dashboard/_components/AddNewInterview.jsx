"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const inputPrompt = "Job position: "+jobPosition+", Job Description: "+jobDescription+", Years of experience: "+jobExperience+", Depends on this information please give me"+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+"interview question with answered in json formate, give question and answred as filed in json.and note gemini: ignore case sensitivity and if you find any error in entering details correct your self and genereate interview as i said";

    
      const result = await chatSession.sendMessage(inputPrompt);
      //console.log(result.response.text());
      const responseText = (result.response.text()).replace('```json','').replace('```','');
      //console.log(result.response.text());
      console.log(JSON.parse(responseText));
      const jsonMatch = responseText.match(/\[.*?\]/s);
      if (!jsonMatch) {
      throw new Error("No valid JSON array found in the response");
      }
      setJsonResponse(responseText);
  
  
      if (responseText) {

        const res = await db.insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: responseText,
            jobPosition: jobPosition,
            jobDesc: jobDescription,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-yyyy'),
          }).returning({ mockId: MockInterview.mockId });

          console.log("Inserted ID:",res);
          if(res)
            {
              setOpenDialog(false);
              router.push('/dashboard/interview/'+res[0]?.mockId)
            }
          
      }
       else {
        console.error("Error: Unable to extract JSON response");
      }
     

      setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h1 className="font-bold text-lg text-center">+ Add New</h1>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Tell us more about your job Interviewing
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div>
              <div>
                Add details about your job position/role, job description, and
                years of experience
              </div>
              <form onSubmit={onSubmit}>
                <div>
                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer "
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Job Description/Tech Stack (In short)</label>
                    <Textarea
                      placeholder="Ex. React, Angular, NodeJs, MySql etc."
                      required
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Years of Experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      min="0"
                      max="70"
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating from AI
                      </>
                    ) : (
                      'Start Interview'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
