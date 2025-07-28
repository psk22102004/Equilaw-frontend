'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { FileText, ChevronLeft, ChevronRight, Plus, CalendarIcon } from 'lucide-react';
import { format, isSameDay } from 'date-fns'

// Mock data for the case and hearings
const caseData = {
  title: "Smith vs Johnson",
  description: "A contract dispute case involving breach of agreement in a business partnership.",
  hearings: [
    {
      id: 1,
      date: new Date("2023-05-01"),
      title: "Initial Hearing",
      transcript: "This is the transcript for the initial hearing...",
      proofs: [
        { id: 1, name: "Contract.pdf" },
        { id: 2, name: "Email_Correspondence.docx" },
      ]
    },
    {
      id: 2,
      date: new Date("2023-06-15"),
      title: "Witness Testimony",
      transcript: "This is the transcript for the witness testimony...",
      proofs: [
        { id: 3, name: "Witness_Statement.pdf" },
        { id: 4, name: "Evidence_Photos.zip" },
      ]
    },
    {
      id: 3,
      date: new Date("2023-07-30"),
      title: "Expert Witness Examination",
      transcript: "This is the transcript for the expert witness examination...",
      proofs: [
        { id: 5, name: "Expert_Report.pdf" },
        { id: 6, name: "Financial_Analysis.xlsx" },
      ]
    },
    {
      id: 4,
      date: new Date("2023-08-15"),
      title: "Final Arguments",
      transcript: "This is the transcript for the final arguments...",
      proofs: [
        { id: 7, name: "Closing_Statement.pdf" },
        { id: 8, name: "Summary_of_Evidence.docx" },
      ]
    },
  ]
}

const HearingCarousel = ({ hearings, onSelectHearing }) => {
  const [startIndex, setStartIndex] = useState(0)

  const nextSlide = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 3, hearings.length - 3))
  }

  const prevSlide = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 3, 0))
  }

  return (
    (<div className="relative flex items-center justify-center space-x-4 my-6">
      <Button
        variant="outline"
        size="icon"
        onClick={prevSlide}
        disabled={startIndex === 0}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {hearings.slice(startIndex, startIndex + 3).map((hearing) => (
        <Button
          key={hearing.id}
          variant="outline"
          onClick={() => onSelectHearing(hearing)}
          className="w-32">
          {format(hearing.date, 'MMM dd, yyyy')}
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        onClick={nextSlide}
        disabled={startIndex >= hearings.length - 3}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>)
  );
}

export function CaseDetailsComponent() {
  const [selectedHearing, setSelectedHearing] = useState(null)
  const [date, setDate] = useState(null)

  const handleDateSelect = (selectedDate) => {
    const hearing = caseData.hearings.find(h => isSameDay(h.date, selectedDate))
    if (hearing) {
      setDate(selectedDate)
      setSelectedHearing(hearing)
    }
  }

  const hearingDates = caseData.hearings.map(hearing => hearing.date)

  return (
    (<div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{caseData.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{caseData.description}</p>
        </CardContent>
      </Card>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Hearings</h2>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : 'Filter by date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                disabled={(date) => !hearingDates.some(hearingDate => isSameDay(hearingDate, date))}
                initialFocus />
            </PopoverContent>
          </Popover>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Hearing
          </Button>
        </div>
      </div>
      <HearingCarousel hearings={caseData.hearings} onSelectHearing={setSelectedHearing} />
      {selectedHearing && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{selectedHearing.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                {selectedHearing.transcript}
              </ScrollArea>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Proof Files</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {selectedHearing.proofs.map((proof) => (
                  <li key={proof.id} className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>{proof.name}</span>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      View
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>)
  );
}