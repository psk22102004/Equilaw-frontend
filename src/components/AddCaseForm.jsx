'use client';
import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import WelcomeContainer from './WelcomeContainer';

export function AddCaseForm() {
  const navigate = useNavigate();
  const [caseDetails, setCaseDetails] = useState({ title: '', description: '', issue_date: '', category: '', caseid: '', judge: '', status: '' });

  const handleCaseInputChange = (field, value) => {
    setCaseDetails({ ...caseDetails, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('title', caseDetails.title);
    formData.append('description', caseDetails.description);
    formData.append('issue_date', caseDetails.issue_date);
    formData.append('category', caseDetails.category);
    formData.append('caseid', caseDetails.caseid);
    formData.append('judge', caseDetails.judge);

    const statusBoolean = caseDetails.status.toLowerCase() === 'true';
    formData.append('status', statusBoolean);

    try {
      const response = await axios.post('https://sih-backend-2t3a.onrender.com/cases/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      navigate('/user');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='min-h-screen  md:flex flex-col mx-auto p-6 font-poppins bg-gray-50'>
      <WelcomeContainer />
      <form
        onSubmit={handleSubmit}
        className="md:space-y-8 max-w-sm w-full md:max-w-4xl mx-auto md:p-8  "
      >
      <div className='flex items-center gap-2'><ArrowLeft className="font-bold " onClick={()=>navigate('/user')}/> <h1 className='text-2xl font-semibold'>Case Details</h1></div> 

        <Card className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
         
          <CardContent className="space-y-6 p-8 bg-gradient-to-b from-white to-gray-50/30">
            
            {/* Case Title */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700 tracking-wide">Case Title</label>
              <Input
                placeholder="Enter case title..."
                value={caseDetails.title}
                onChange={(e) => handleCaseInputChange('title', e.target.value)}
                className="w-full h-12 rounded-xl border-2 border-gray-200 focus:border-slate-400 focus:ring-slate-400 transition-all duration-200 bg-white/80 backdrop-blur-sm"
              />
            </div>

            {/* Case Description */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700 tracking-wide">Case Description</label>
              <Textarea
                placeholder="Provide detailed case description..."
                value={caseDetails.description}
                onChange={(e) => handleCaseInputChange('description', e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 focus:border-slate-400 focus:ring-slate-400 transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none"
                rows={5}
              />
            </div>

            {/* Date and Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700 tracking-wide">Issue Date</label>
                <Input
                  type="date"
                  id='issueDate'
                  value={caseDetails.issue_date}
                  onChange={(e) => handleCaseInputChange('issue_date', e.target.value)}
                  className="w-full h-12 rounded-xl border-2 border-gray-200 focus:border-slate-400 focus:ring-slate-400 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700 tracking-wide">Case Category</label>
                <Input
                  placeholder="e.g., Civil, Criminal, Family..."
                  value={caseDetails.category}
                  onChange={(e) => handleCaseInputChange('category', e.target.value)}
                  className="w-full h-12 rounded-xl border-2 border-gray-200 focus:border-slate-400 focus:ring-slate-400 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Case ID and Judge Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700 tracking-wide">Case ID</label>
                <Input
                  placeholder="Enter unique case identifier..."
                  value={caseDetails.caseid}
                  onChange={(e) => handleCaseInputChange('caseid', e.target.value)}
                  className="w-full h-12 rounded-xl border-2 border-gray-200 focus:border-slate-400 focus:ring-slate-400 transition-all duration-200 bg-white/80 backdrop-blur-sm font-mono"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700 tracking-wide">Presiding Judge</label>
                <Input
                  placeholder="Enter judge's full name..."
                  value={caseDetails.judge}
                  onChange={(e) => handleCaseInputChange('judge', e.target.value)}
                  className="w-full h-12 rounded-xl border-2 border-gray-200 focus:border-slate-400 focus:ring-slate-400 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Status Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700 tracking-wide">Case Status</label>
              <select
                value={caseDetails.status}
                onChange={(e) => handleCaseInputChange('status', e.target.value)}
                className="w-full h-12 rounded-xl border-2 border-gray-200 focus:border-slate-400 focus:ring-slate-400 transition-all duration-200 bg-white/80 backdrop-blur-sm px-4 text-slate-700 font-medium"
              >
                <option value="">Select case status...</option>
                <option value={true}>Active (Open)</option>
                <option value={false}>Closed (Resolved)</option>
              </select>
            </div>
           <div className='flex justify-end items-end'> <Button
          type="submit"
          variant="default"
          className="-mt-4 md:-mt-0 h-14 bg-black  font-thin hover:from-slate-800 hover:to-slate-900 text-white  font-medium  rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 tracking-wide"
        >
          Submit Case Details
        </Button></div>
            
          </CardContent>
        </Card>

        
      </form>
    </div>
  );
}