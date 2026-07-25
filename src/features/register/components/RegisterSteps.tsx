"use client";

import { motion } from "framer-motion";

import RegisterStepCard from "./RegisterStepCard";

import type { RegisterPage } from "@/types/register";

interface RegisterStepsProps {
  register: RegisterPage;
}

export default function RegisterSteps({ register }: RegisterStepsProps) {
  if (!register.Steps?.length) {
    return null;
  }

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          {register.StepsBadge && (
            <span className="inline-flex rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-4 py-1 text-sm font-medium tracking-wide text-[#60A5FA]">
              {register.StepsBadge}
            </span>
          )}

          <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {register.StepsTitle}
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/70">
            {register.StepsDescription}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {register.Steps.map((step, index) => (
            <RegisterStepCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
