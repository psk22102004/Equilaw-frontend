'use client';
import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

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
    <div className='  md:flex mx-auto items-center bg-backg p-6 '>
      <form
        onSubmit={handleSubmit}
        className=" md:space-y-8 max-w-sm  w-full md:max-w-4xl mx-auto  md:p-8 bg-white shadow-lg rounded-xl"
      >
        <h1 className='hidden md:block mb-0 text-xl md:text-3xl font-bold font-poppins text-center  md:mb-8'>Add Case Details</h1>

        <Card className="bg-white md:block shadow-md rounded-lg">
          <CardHeader className="bg-blue-700 p-4 rounded-t-lg">
            <CardTitle className="text-white text-lg font-semibold">Case Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">Case Title</label>
              <Input
                placeholder="Enter Case Title"
                value={caseDetails.title}
                onChange={(e) => handleCaseInputChange('title', e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:border-blue-800 focus:ring-blue-800"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">Case Description</label>
              <Textarea
                placeholder="Enter Case Description"
                value={caseDetails.description}
                onChange={(e) => handleCaseInputChange('description', e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:border-blue-800 focus:ring-blue-800"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">Issue Date</label>
                <Input
                  type="date"
                  id='issueDate'
                  value={caseDetails.issue_date}
                  onChange={(e) => handleCaseInputChange('issue_date', e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-800 focus:ring-blue-800"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">Case Category</label>
                <Input
                  placeholder="Enter Case Category"
                  value={caseDetails.category}
                  onChange={(e) => handleCaseInputChange('category', e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-800 focus:ring-blue-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">Case ID</label>
                <Input
                  placeholder="Enter Case ID"
                  value={caseDetails.caseid}
                  onChange={(e) => handleCaseInputChange('caseid', e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-800 focus:ring-blue-800"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">Judge Name</label>
                <Input
                  placeholder="Enter Judge Name"
                  value={caseDetails.judge}
                  onChange={(e) => handleCaseInputChange('judge', e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-800 focus:ring-blue-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800">Case Status (true/false)</label>
              <select
                value={caseDetails.status}
                onChange={(e) => handleCaseInputChange('status', e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:border-blue-800 focus:ring-blue-800"
              >
                <option value={null}>Select an option </option>
                <option value={true}>True </option>
                <option value={false}>False</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Button
          type="submit"
          variant="default"
          className=" -mt-4 md:-mt-0 w-full py-2 md:py-6 bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-900 focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50"
        >
          Submit Case
        </Button>
      </form>
    </div>
  );
}
