import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Card() {
  return (
    <section className="py-10 px-5 md:px-20 bg-white">
    
      <Accordion type="single" collapsible className="max-w-4xl mx-auto space-y-3">
        
        <AccordionItem value="item-1" className="border-b border-blue-300">
          <AccordionTrigger>How does EquiLaw use AI in legal research?</AccordionTrigger>
          <AccordionContent className="border-b border-blue-300">
            EquiLaw integrates advanced AI to scan, categorize, and summarize legal documents, saving hours of manual research and boosting accuracy.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border-b border-blue-300">
          <AccordionTrigger>What legal technologies are supported?</AccordionTrigger>
          <AccordionContent className="border-b border-blue-300">
            EquiLaw supports case law analysis, document automation, contract summarization, and other emerging legal tech innovations tailored for commercial courts.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border-b border-blue-300">
          <AccordionTrigger>Can EquiLaw help extract insights from legal data?</AccordionTrigger>
          <AccordionContent className="border-b border-blue-300">
            Absolutely. EquiLaw’s data engine can uncover trends, detect patterns, and highlight key facts across large legal datasets effortlessly.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border-b border-blue-300"  >
          <AccordionTrigger>Is my legal data secure on the platform?</AccordionTrigger>
            <AccordionContent className="border-b border-blue-300">
            Yes. EquiLaw follows industry-grade encryption and privacy protocols to ensure all your legal data remains confidential and secure.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="border-b border-blue-300"  >
          <AccordionTrigger>Who can benefit most from using EquiLaw?</AccordionTrigger>
        <AccordionContent className="border-b border-blue-300">
            EquiLaw is ideal for legal professionals, law firms, and judicial officers looking to streamline workflows, reduce manual effort, and make informed decisions using AI-powered insights.
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </section>
  );
}

export default Card;
