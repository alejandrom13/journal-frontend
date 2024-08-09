"use client";
import React from "react";
import type { CardComponentProps } from "onborda";
import { useOnborda } from "onborda";
import { XIcon } from "lucide-react";

// Shadcn
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { finishOnboarding } from "@/actions/handleTheme";
import { toast } from "sonner";

const CustomCard: React.FC<CardComponentProps> = ({
  step,
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  arrow,
}) => {
  // Onborda hooks
  const { closeOnborda } = useOnborda();
  const { user } = useUser();
  async function handleOnboardingFinish() {
    try {
      const data = {
        userId: user?.id!,
      };

      await finishOnboarding(data);
      closeOnborda();
    } catch (error) {
      toast.error("An error occurred while finishing onboarding!");
    }
  }

  return (
    <div className="relative z-[9999] pointer-events-auto">
      <Card className="border-0 rounded-3xl max-w-vw min-w-[400px]">
        <CardHeader>
          <div className="flex items-start justify-between w-full">
            <div>
              <CardTitle className="mb-2 text-lg">
                {step.icon} {step.title}
              </CardTitle>
              <CardDescription>
                {currentStep + 1} of {totalSteps}
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => closeOnborda()}>
              <XIcon size={16} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>{step.content}</CardContent>
        <CardFooter>
          <div className="flex justify-between w-full">
            {currentStep !== 0 && (
              <Button onClick={() => prevStep()}>Previous</Button>
            )}
            {currentStep + 1 !== totalSteps && (
              <Button onClick={() => nextStep()} className="ml-auto">
                Next
              </Button>
            )}
            {currentStep + 1 === totalSteps && (
              <Button
                onClick={() => handleOnboardingFinish()}
                className="ml-auto"
              >
                Finish
              </Button>
            )}
          </div>
        </CardFooter>
        <span className="text-card">{arrow}</span>
      </Card>
    </div>
  );
};

export default CustomCard;
