import React, { useState, useRef } from 'react';
import { initialFormData, FormData } from './types';
import { FormRow, FormCell, CheckboxGroup, SectionHeader, BooleanCheckbox, BoxInput, TableRow, TableLabel, TableInput } from './components/FormComponents';
import { Printer, Upload } from 'lucide-react';
import { FormRow, FormCell, CheckboxGroup, SectionHeader, BooleanCheckbox } from './components/FormComponents';
import { Printer, Upload, Download } from 'lucide-react';

function App() {
  const [data, setData] = useState<FormData>(initialFormData);
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = (field: keyof FormData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setPhoto(ev.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Control Bar */}
      <div className="bg-blue-900 text-white p-4 sticky top-0 z-50 shadow-md no-print flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">Banglar Yuba Sathi</h1>
          <p className="text-xs opacity-80">Fill details below. Click boxes to type.</p>
        </div>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-white text-blue-900 px-4 py-2 rounded font-bold hover:bg-gray-100 transition"
        >
          <Printer size={18} /> Print / Save PDF
        </button>
      </div>

      {/* Form Container - Mimicking A4 Width */}
      <div className="max-w-[210mm] mx-auto bg-white shadow-xl my-4 md:my-8 min-h-[297mm] relative print:shadow-none print:m-0 print:w-full">
        
        {/* PAGE 1 */}
        <div className="p-4 md:p-8 border border-gray-300 print:border-none">
          
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="font-bold text-lg">Government of West Bengal</h2>
            <h1 className="font-bold text-xl md:text-2xl uppercase">BANGLAR YUBA SATHI SCHEME <span className="font-bengali font-normal">(বাংলার যুবসাথী প্রকল্প)</span></h1>
            <h3 className="font-bold text-md underline mt-1">APPLICATION FORM</h3>
          </div>

          <div className="border-2 border-black mb-1 p-1 text-center font-bold text-xs">
             To be filled in English Capital Letters Only. <span className="font-bengali font-normal">(ইংরেজি বড় হাতের অক্ষরে পূরণ করুন)</span> <br/>
             Please tick Appropriate Boxes, wherever applicable <span className="font-bengali font-normal">(প্রযোজ্য ক্ষেত্রে টিক চিহ্ন দিন)</span>
          </div>

          <div className="text-center font-bold underline mb-4 text-sm">
            APPLICATION FORM for BANGLAR YUBA SATHI SCHEME <span className="font-bengali font-normal">(বাংলার যুবসাথী প্রকল্পের আবেদন পত্র)</span>
          </div>

          {/* Top Section: ID & Photo */}
          <div className="border-2 border-black border-b-0 flex">
            {/* Left Column (Fields) */}
            <div className="flex-grow">
               <TableRow className="border-b">
                 <TableLabel label="Duare Sarkar Registration no." subLabel="দুয়ারে সরকার রেজিস্ট্রেশন নম্বর" />
                 <TableInput>
                    <BoxInput length={16} value={data.duareSarkarRegNo} onChange={(v) => update('duareSarkarRegNo', v)} />
                 </TableInput>
               </TableRow>
               <TableRow className="border-b-0">
                 <TableLabel label="Aadhaar No." subLabel="আধার নং" />
                 <TableInput>
                    <BoxInput length={12} value={data.aadhaarNo} onChange={(v) => update('aadhaarNo', v)} />
                 </TableInput>
               </TableRow>
          {/* Main Form Body */}
          <div className="border-2 border-black flex">
            {/* Left Column (Fields) */}
            <div className="flex-grow">
               <FormRow>
                 <FormCell 
                   label="Duare Sarkar Registration no." 
                   subLabel="দুয়ারে সরকার রেজিস্ট্রেশন নম্বর"
                   value={data.duareSarkarRegNo} 
                   onChange={(v) => update('duareSarkarRegNo', v)} 
                 />
               </FormRow>
               <FormRow>
                 <FormCell 
                   label="Aadhaar No." 
                   subLabel="আধার নং"
                   value={data.aadhaarNo} 
                   onChange={(v) => update('aadhaarNo', v)} 
                 />
               </FormRow>
            </div>
            
            {/* Right Column (Photo) */}
            <div 
              className="w-32 md:w-40 border-l border-black flex flex-col items-center justify-center p-2 cursor-pointer hover:bg-gray-50 relative group bg-white"
              className="w-32 md:w-40 border-l-2 border-black flex flex-col items-center justify-center p-2 cursor-pointer hover:bg-gray-50 relative group"
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                accept="image/*" 
                onChange={handlePhotoUpload} 
              />
              {photo ? (
                <img src={photo} alt="Passport" className="w-full h-full object-cover" />
              ) : (
                <div className="text-[10px] text-center text-gray-500 leading-tight">
                  Colour passport size Photo paste here & Sign in upper white portion
                  <br/>
                  <div className="mt-4 text-blue-600 underline font-bold no-print flex flex-col items-center gap-1">
                    <Upload size={16} /> Click to Upload
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Table Structure */}
          <div className="border-2 border-black">
            
            <TableRow>
              <TableLabel 
                label="Beneficiary Name (As in MP or Equivalent exam)" 
                subLabel="উপভোক্তার নাম (মাধ্যমিক বা সমমানের পরীক্ষা অনুযায়ী)" 
              />
              <TableInput>
                <BoxInput length={24} value={data.beneficiaryName} onChange={(v) => update('beneficiaryName', v)} />
              </TableInput>
            </TableRow>
            
            <TableRow>
              <TableLabel 
                label="Mobile Number (Linked with Bank Account)" 
                subLabel="মোবাইল নম্বর (ব্যাঙ্ক অ্যাকাউন্ট লিঙ্কযুক্ত)" 
              />
              <TableInput>
                <BoxInput length={10} value={data.mobileNo} onChange={(v) => update('mobileNo', v)} />
              </TableInput>
            </TableRow>

            <TableRow>
              <TableLabel 
                label="Email Id. (If any)" 
                subLabel="ইমেল আইডি (যদি থাকে)" 
              />
              <TableInput>
                <BoxInput length={24} value={data.email} onChange={(v) => update('email', v)} uppercase={false} />
              </TableInput>
            </TableRow>

            <TableRow>
              <TableLabel 
                label="Gender (লিঙ্গ) :" 
              />
              <TableInput>
                <CheckboxGroup
                  label=""
                  options={[
                    { label: 'Male', bengaliLabel: 'পুরুষ', value: 'Male' },
                    { label: 'Female', bengaliLabel: 'মহিলা', value: 'Female' },
                    { label: 'Others', bengaliLabel: 'অন্যান্য', value: 'Others' },
                  ]}
                  selectedValue={data.gender}
                  onChange={(v) => update('gender', v)}
                  horizontal={true}
                />
              </TableInput>
            </TableRow>

            {/* Split Row for DOB and Age */}
            <div className="flex flex-col md:flex-row print:flex-row border-b border-black">
               <div className="flex-1 flex border-b md:border-b-0 print:border-b-0 border-r border-black">
                  <TableLabel className="border-r border-black border-b-0" label="Date of Birth: (DD/MM/YYYY)" subLabel="জন্ম তারিখ: (তারিখ/মাস/বছর)" />
                  <div className="flex-1 p-2 flex items-center justify-center bg-white">
                      <div className="flex gap-1 items-center">
                        <BoxInput length={2} value={data.dobDay} onChange={v => update('dobDay', v)} />
                        <span className="font-bold">/</span>
                        <BoxInput length={2} value={data.dobMonth} onChange={v => update('dobMonth', v)} />
                        <span className="font-bold">/</span>
                        <BoxInput length={4} value={data.dobYear} onChange={v => update('dobYear', v)} />
                      </div>
                  </div>
               </div>
               <div className="flex-1 flex">
                  <TableLabel className="border-r border-black border-b-0" label="Age as on 01/04/2026: in Year" subLabel="০১/০৪/২০২৬ তারিখে বয়স: বছরে" />
                  <div className="flex-1 p-2 flex items-center justify-center bg-white">
                     <BoxInput length={2} value={data.ageYears} onChange={v => update('ageYears', v)} />
                  </div>
               </div>
            </div>

            <TableRow>
              <TableLabel label="Father's Name (পিতার নাম )" />
              <TableInput>
                <BoxInput length={24} value={data.fathersName} onChange={(v) => update('fathersName', v)} />
              </TableInput>
            </TableRow>

            <TableRow>
              <TableLabel label="Mother's Name ( মাতার নাম )" />
              <TableInput>
                <BoxInput length={24} value={data.mothersName} onChange={(v) => update('mothersName', v)} />
              </TableInput>
            </TableRow>

            <TableRow>
              <TableLabel label="Spouse Name ( স্বামী বা স্ত্রীর নাম )" />
              <TableInput>
                <BoxInput length={24} value={data.spouseName} onChange={(v) => update('spouseName', v)} />
              </TableInput>
            </TableRow>

            <TableRow>
              <TableLabel label="Category, if not General (শ্রেণী, সাধারণ শ্রেণী ভুক্ত না হলে):" />
              <TableInput>
                <CheckboxGroup
                  label=""
                  options={[
                    { label: 'SC', bengaliLabel: 'তপশিলি জাতি', value: 'SC' },
                    { label: 'ST', bengaliLabel: 'তপশিলি উপজাতি', value: 'ST' },
                    { label: 'OBC', bengaliLabel: 'অন্যান্য অনগ্রসর শ্রেণী', value: 'OBC' },
                  ]}
                  selectedValue={data.category}
                  onChange={(v) => update('category', v)}
                  horizontal={true}
                />
              </TableInput>
            </TableRow>
            
            <TableRow>
              <TableLabel label="Certificate No. (সার্টিফিকেট নম্বর)" />
              <TableInput>
                <BoxInput length={16} value={data.certificateNo} onChange={(v) => update('certificateNo', v)} />
              </TableInput>
            </TableRow>

             <TableRow>
              <TableLabel label="Marital Status (বৈবাহিক অবস্থা)" />
              <TableInput>
                 <CheckboxGroup
                  label=""
                  options={[
                    { label: 'Unmarried', bengaliLabel: 'অবিবাহিত', value: 'Unmarried' },
                    { label: 'Widow/Widower', bengaliLabel: 'বিধবা/বিপত্নীক', value: 'Widow' },
                    { label: 'Married', bengaliLabel: 'বিবাহিত', value: 'Married' },
                    { label: 'Separated', bengaliLabel: 'বিচ্ছিন্ন', value: 'Separated' },
                  ]}
                  selectedValue={data.maritalStatus}
                  onChange={(v) => update('maritalStatus', v)}
                  horizontal={true}
                />
              </TableInput>
            </TableRow>

          </div>
          
          {/* Address Section */}
          <div className="border-2 border-black border-t-0">
             <SectionHeader title="Contact Details" bengaliTitle="যোগাযোগের বিবরণ" />
             <TableRow>
                <TableLabel label="House/Premise No." subLabel="বাড়ির নম্বর / প্রাঙ্গন নম্বর" />
                <TableInput><BoxInput length={24} value={data.houseNo} onChange={v => update('houseNo', v)} /></TableInput>
             </TableRow>
             <TableRow>
                <TableLabel label="Village/Town/City" subLabel="গ্রাম/শহর/নগরী" />
                <TableInput><BoxInput length={24} value={data.village} onChange={v => update('village', v)} /></TableInput>
             </TableRow>
             <TableRow>
                <TableLabel label="Post Office" subLabel="ডাকঘর" />
                <TableInput><BoxInput length={24} value={data.postOffice} onChange={v => update('postOffice', v)} /></TableInput>
             </TableRow>
             <div className="flex flex-col md:flex-row print:flex-row border-b border-black">
                <div className="flex-1 flex border-b md:border-b-0 print:border-b-0 border-r border-black">
                   <TableLabel className="border-r border-black border-b-0" label="GP/Ward No" subLabel="গ্রাম পঞ্চায়েত/ওয়ার্ড নম্বর" />
                   <TableInput><BoxInput length={12} value={data.gpWard} onChange={v => update('gpWard', v)} /></TableInput>
                </div>
                <div className="flex-1 flex">
                   <TableLabel className="border-r border-black border-b-0" label="Pin Code" subLabel="পিন কোড" />
                   <TableInput><BoxInput length={6} value={data.pinCode} onChange={v => update('pinCode', v)} /></TableInput>
                </div>
             </div>
             <TableRow>
                <TableLabel label="Block/Municipality/Corp." subLabel="ব্লক/পৌরসভা/কর্পোরেশন" />
                <TableInput><BoxInput length={24} value={data.block} onChange={v => update('block', v)} /></TableInput>
             </TableRow>
             <TableRow>
                <TableLabel label="Police Station" subLabel="থানা" />
                <TableInput><BoxInput length={24} value={data.policeStation} onChange={v => update('policeStation', v)} /></TableInput>
             </TableRow>
             <TableRow>
                <TableLabel label="District" subLabel="জেলা" />
                <TableInput><BoxInput length={24} value={data.district} onChange={v => update('district', v)} /></TableInput>
             </TableRow>
             <TableRow className="border-b-0">
                <TableLabel label="State" subLabel="রাজ্য" />
                <TableInput><BoxInput length={24} value={data.state} onChange={v => update('state', v)} /></TableInput>
             </TableRow>
          {/* Continuing the table structure */}
          <div className="border-x-2 border-b-2 border-black">
            <FormRow>
              <FormCell 
                label="Beneficiary Name" 
                subLabel="উপভোক্তার নাম (মাধ্যমিক বা সমমানের পরীক্ষা অনুযায়ী)"
                value={data.beneficiaryName}
                onChange={(v) => update('beneficiaryName', v)}
              />
            </FormRow>
            
            <FormRow>
               <FormCell 
                 label="Mobile Number (Linked with Bank Account)" 
                 subLabel="মোবাইল নম্বর (ব্যাঙ্ক অ্যাকাউন্ট লিঙ্কযুক্ত)"
                 value={data.mobileNo}
                 onChange={(v) => update('mobileNo', v)}
               />
               <FormCell 
                 label="Email Id. (If any)" 
                 subLabel="ইমেল আইডি (যদি থাকে)"
                 value={data.email}
                 onChange={(v) => update('email', v)}
               />
            </FormRow>

            <FormRow>
              <CheckboxGroup
                label="Gender"
                bengaliLabel="লিঙ্গ"
                options={[
                  { label: 'Male', bengaliLabel: 'পুরুষ', value: 'Male' },
                  { label: 'Female', bengaliLabel: 'মহিলা', value: 'Female' },
                  { label: 'Others', bengaliLabel: 'অন্যান্য', value: 'Others' },
                ]}
                selectedValue={data.gender}
                onChange={(v) => update('gender', v)}
                className="flex-grow"
              />
            </FormRow>

            <FormRow>
              <div className="flex-1 border-r border-black p-1 flex items-end gap-2">
                 <div className="text-xs font-bold w-1/2">
                   Date of Birth: (DD/MM/YYYY) <br/>
                   <span className="font-bengali font-normal">জন্ম তারিখ: (তারিখ/মাস/বছর)</span>
                 </div>
                 <div className="flex gap-1 items-center">
                   <input 
                      className="w-8 border-b border-black text-center font-handwriting text-blue-700" 
                      placeholder="DD" 
                      value={data.dobDay} 
                      onChange={e => update('dobDay', e.target.value)} 
                    />
                    <span>/</span>
                    <input 
                      className="w-8 border-b border-black text-center font-handwriting text-blue-700" 
                      placeholder="MM" 
                      value={data.dobMonth} 
                      onChange={e => update('dobMonth', e.target.value)} 
                    />
                    <span>/</span>
                    <input 
                      className="w-12 border-b border-black text-center font-handwriting text-blue-700" 
                      placeholder="YYYY" 
                      value={data.dobYear} 
                      onChange={e => update('dobYear', e.target.value)} 
                    />
                 </div>
              </div>
              <div className="flex-1 p-1 flex items-end gap-2">
                 <div className="text-xs font-bold w-1/2">
                    Age as on 01/04/2026: in Year <br/>
                    <span className="font-bengali font-normal">০১/০৪/২০২৬ তারিখে বয়স: বছরে</span>
                 </div>
                 <input 
                    className="w-16 border-b border-black text-center font-handwriting text-blue-700" 
                    value={data.ageYears} 
                    onChange={e => update('ageYears', e.target.value)} 
                  />
              </div>
            </FormRow>

            <FormRow>
              <FormCell 
                label="Father's Name" 
                subLabel="পিতার নাম"
                value={data.fathersName}
                onChange={(v) => update('fathersName', v)}
              />
            </FormRow>
            <FormRow>
              <FormCell 
                label="Mother's Name" 
                subLabel="মাতার নাম"
                value={data.mothersName}
                onChange={(v) => update('mothersName', v)}
              />
            </FormRow>
            <FormRow>
              <FormCell 
                label="Spouse Name" 
                subLabel="স্বামী বা স্ত্রীর নাম"
                value={data.spouseName}
                onChange={(v) => update('spouseName', v)}
              />
            </FormRow>

            <FormRow>
              <CheckboxGroup
                label="Category, if not General"
                bengaliLabel="শ্রেণী, সাধারণ শ্রেণী ভুক্ত না হলে"
                options={[
                  { label: 'SC', bengaliLabel: 'তপশিলি জাতি', value: 'SC' },
                  { label: 'ST', bengaliLabel: 'তপশিলি উপজাতি', value: 'ST' },
                  { label: 'OBC', bengaliLabel: 'অন্যান্য অনগ্রসর শ্রেণী', value: 'OBC' },
                ]}
                selectedValue={data.category}
                onChange={(v) => update('category', v)}
                className="w-full"
              />
            </FormRow>
            
            <FormRow>
               <FormCell 
                 label="Certificate No." 
                 subLabel="সার্টিফিকেট নম্বর"
                 value={data.certificateNo}
                 onChange={(v) => update('certificateNo', v)}
               />
            </FormRow>

            <FormRow>
              <CheckboxGroup
                label="Marital Status"
                bengaliLabel="বৈবাহিক অবস্থা"
                options={[
                  { label: 'Unmarried', bengaliLabel: 'অবিবাহিত', value: 'Unmarried' },
                  { label: 'Widow/Widower', bengaliLabel: 'বিধবা/বিপত্নীক', value: 'Widow' },
                  { label: 'Married', bengaliLabel: 'বিবাহিত', value: 'Married' },
                  { label: 'Separated', bengaliLabel: 'বিচ্ছিন্ন', value: 'Separated' },
                ]}
                selectedValue={data.maritalStatus}
                onChange={(v) => update('maritalStatus', v)}
                className="w-full"
              />
            </FormRow>

            {/* Address Section */}
            <SectionHeader title="Contact Details" bengaliTitle="যোগাযোগের বিবরণ" />

            <FormRow>
              <FormCell 
                label="House/Premise No." 
                subLabel="বাড়ির নম্বর / প্রাঙ্গন নম্বর"
                value={data.houseNo}
                onChange={(v) => update('houseNo', v)}
              />
            </FormRow>
            <FormRow>
              <FormCell 
                label="Village/Town/City" 
                subLabel="গ্রাম/শহর/নগরী"
                value={data.village}
                onChange={(v) => update('village', v)}
              />
            </FormRow>
            <FormRow>
              <FormCell 
                label="Post Office" 
                subLabel="ডাকঘর"
                value={data.postOffice}
                onChange={(v) => update('postOffice', v)}
              />
            </FormRow>
            <FormRow>
              <FormCell 
                label="GP/Ward No" 
                subLabel="গ্রাম পঞ্চায়েত/ওয়ার্ড নম্বর"
                value={data.gpWard}
                onChange={(v) => update('gpWard', v)}
              />
            </FormRow>
             <FormRow>
              <FormCell 
                label="Block/Municipality/Corp." 
                subLabel="ব্লক/পৌরসভা/কর্পোরেশন"
                value={data.block}
                onChange={(v) => update('block', v)}
              />
            </FormRow>
            <FormRow>
              <FormCell 
                label="Police Station" 
                subLabel="থানা"
                value={data.policeStation}
                onChange={(v) => update('policeStation', v)}
              />
            </FormRow>
             <FormRow>
              <FormCell 
                label="District" 
                subLabel="জেলা"
                value={data.district}
                onChange={(v) => update('district', v)}
              />
            </FormRow>
            <FormRow>
              <FormCell 
                label="Pin Code" 
                subLabel="পিন কোড"
                value={data.pinCode}
                onChange={(v) => update('pinCode', v)}
              />
            </FormRow>
             <FormRow>
              <FormCell 
                label="State" 
                subLabel="রাজ্য"
                value={data.state}
                onChange={(v) => update('state', v)}
              />
            </FormRow>
          </div>
        </div>

        {/* PAGE 2 */}
        <div className="print-break mt-8 md:mt-0 p-4 md:p-8 border border-gray-300 md:border-t-0 print:border-none print:mt-0">
            
            {/* Education Table */}
            <div className="border-2 border-black mb-6">
               <div className="grid grid-cols-12 border-b border-black bg-gray-100 text-[10px] md:text-xs font-bold text-center">
                  <div className="col-span-3 border-r border-black p-1">Examination <br/>(পরীক্ষা)</div>
                  <div className="col-span-3 border-r border-black p-1">Board <br/>(বোর্ড)</div>
                  <div className="col-span-2 border-r border-black p-1">Roll <br/>(রোল)</div>
                  <div className="col-span-2 border-r border-black p-1">No. <br/>(সংখ্যা)</div>
                  <div className="col-span-2 p-1">Year <br/>(বর্ষ)</div>
               </div>
               {/* Row 1 */}
               <div className="grid grid-cols-12">
                   <div className="col-span-3 border-r border-black p-1 text-[10px] font-bold">
                     MP or Equivalent <br/> <span className="font-bengali font-normal">মাধ্যমিক বা সমতুল্য</span>
                   </div>
                   <div className="col-span-3 border-r border-black p-1">
                      <BoxInput length={8} value={data.education[0].board} onChange={(val) => {
                        const newEd = [...data.education];
                        newEd[0].board = val;
                      <input className="w-full h-full bg-transparent font-handwriting text-blue-700 uppercase" value={data.education[0].board} onChange={(e) => {
                        const newEd = [...data.education];
                        newEd[0].board = e.target.value;
                        update('education', newEd);
                      }} placeholder="WBBSE/CBSE/ICSE" />
                   </div>
                   <div className="col-span-2 border-r border-black p-1">
                      <input className="w-full h-full bg-transparent font-handwriting text-blue-700" value={data.education[0].roll} onChange={(e) => {
                        const newEd = [...data.education];
                        newEd[0].roll = e.target.value;
                        update('education', newEd);
                      }} />
                   </div>
                   <div className="col-span-2 border-r border-black p-1">
                      <BoxInput length={8} value={data.education[0].roll} onChange={(val) => {
                        const newEd = [...data.education];
                        newEd[0].roll = val;
                        update('education', newEd);
                      }} />
                   </div>
                   <div className="col-span-2 border-r border-black p-1">
                      <BoxInput length={8} value={data.education[0].no} onChange={(val) => {
                        const newEd = [...data.education];
                        newEd[0].no = val;
                      <input className="w-full h-full bg-transparent font-handwriting text-blue-700" value={data.education[0].no} onChange={(e) => {
                        const newEd = [...data.education];
                        newEd[0].no = e.target.value;
                        update('education', newEd);
                      }} />
                   </div>
                    <div className="col-span-2 p-1">
                      <BoxInput length={4} value={data.education[0].year} onChange={(val) => {
                        const newEd = [...data.education];
                        newEd[0].year = val;
                      <input className="w-full h-full bg-transparent font-handwriting text-blue-700" value={data.education[0].year} onChange={(e) => {
                        const newEd = [...data.education];
                        newEd[0].year = e.target.value;
                        update('education', newEd);
                      }} />
                   </div>
               </div>
            </div>

            <div className="border-2 border-black mb-6">
              <TableRow>
                 <TableLabel label="Educational Qualification (highest)" subLabel="শিক্ষাগত যোগ্যতা (সর্বোচ্চ)" />
                 <TableInput><BoxInput length={24} value={data.highestQualification} onChange={v => update('highestQualification', v)} /></TableInput>
              </TableRow>
              <TableRow className="border-b-0">
                 <TableLabel label="Present Occupation" subLabel="বর্তমান পেশা" />
                 <TableInput><BoxInput length={24} value={data.presentOccupation} onChange={v => update('presentOccupation', v)} /></TableInput>
              </TableRow>
              <FormRow>
                 <FormCell 
                   label="Educational Qualification (highest)" 
                   subLabel="শিক্ষাগত যোগ্যতা (সর্বোচ্চ)"
                   value={data.highestQualification}
                   onChange={v => update('highestQualification', v)}
                 />
              </FormRow>
              <FormRow>
                 <FormCell 
                   label="Present Occupation" 
                   subLabel="বর্তমান পেশা"
                   value={data.presentOccupation}
                   onChange={v => update('presentOccupation', v)}
                 />
              </FormRow>
            </div>

            {/* Bank Details */}
            <div className="border-2 border-black mb-6">
              <SectionHeader title="Bank Account Details (Aadhaar linked)" bengaliTitle="ব্যাঙ্ক অ্যাকাউন্ট (আধার কার্ডের সাথে সংযুক্ত)" />
              <TableRow>
                <TableLabel label="Bank Name" subLabel="ব্যাঙ্কের নাম" />
                <TableInput><BoxInput length={20} value={data.bankName} onChange={v => update('bankName', v)} /></TableInput>
              </TableRow>
              <TableRow>
                <TableLabel label="Branch Name" subLabel="ব্যাঙ্ক শাখা" />
                <TableInput><BoxInput length={20} value={data.branchName} onChange={v => update('branchName', v)} /></TableInput>
              </TableRow>
              <TableRow>
                <TableLabel label="Account No." subLabel="ব্যাঙ্ক অ্যাকাউন্ট নম্বর" />
                <TableInput><BoxInput length={20} value={data.accountNo} onChange={v => update('accountNo', v)} /></TableInput>
              </TableRow>
              <TableRow className="border-b-0">
                <TableLabel label="IFSC Code" subLabel="আই. এফ. এস. সি. কোড" />
                <TableInput><BoxInput length={11} value={data.ifsc} onChange={v => update('ifsc', v)} /></TableInput>
              </TableRow>
              <FormRow>
                <FormCell label="Bank Name" subLabel="ব্যাঙ্কের নাম" value={data.bankName} onChange={v => update('bankName', v)} />
              </FormRow>
              <FormRow>
                <FormCell label="Branch Name" subLabel="ব্যাঙ্ক শাখা" value={data.branchName} onChange={v => update('branchName', v)} />
              </FormRow>
              <FormRow>
                <FormCell label="Account No." subLabel="ব্যাঙ্ক অ্যাকাউন্ট নম্বর" value={data.accountNo} onChange={v => update('accountNo', v)} />
              </FormRow>
              <FormRow>
                <FormCell label="IFSC Code" subLabel="আই. এফ. এস. সি. কোড" value={data.ifsc} onChange={v => update('ifsc', v)} />
              </FormRow>
            </div>

            {/* Financial Assistance */}
            <div className="border-2 border-black mb-6">
               <div className="flex border-b border-black">
                 <div className="p-2 w-3/4 text-xs font-bold border-r border-black">
                   Whether financial assistance received from Govt. (except for any State provided financial assistance for educational benefit or scholarship)
                   <br/>
                   <span className="font-bengali font-normal">(অন্য কোনো সরকারি সাহায্য পান কিনা রাজ্য সরকার প্রদত্ত শিক্ষাগত সুবিধা বা বৃত্তি ছাড়া)</span>
                 </div>
                 <div className="w-1/4 flex flex-col justify-center gap-2 p-2">
                    <label className="flex items-center gap-2">
                       <input type="radio" name="assist" checked={data.receivedAssistance === 'Yes'} onChange={() => update('receivedAssistance', 'Yes')} />
                       <span className="text-xs font-bold">Yes <span className="font-bengali font-normal">(হ্যাঁ)</span></span>
                    </label>
                    <label className="flex items-center gap-2">
                       <input type="radio" name="assist" checked={data.receivedAssistance === 'No'} onChange={() => update('receivedAssistance', 'No')} />
                       <span className="text-xs font-bold">No <span className="font-bengali font-normal">(না)</span></span>
                    </label>
                 </div>
               </div>
               <TableRow className="border-b-0">
                 <TableLabel label="If yes give details" subLabel="যদি পান বিস্তারিত বিবরণ দিন" />
                 <TableInput><BoxInput length={24} value={data.assistanceDetails} onChange={v => update('assistanceDetails', v)} /></TableInput>
               </TableRow>
               <FormRow>
                 <FormCell 
                   label="If yes give details" 
                   subLabel="যদি পান বিস্তারিত বিবরণ দিন"
                   value={data.assistanceDetails}
                   onChange={v => update('assistanceDetails', v)}
                 />
               </FormRow>
            </div>

            {/* Enclosure List */}
            <div className="border-2 border-black mb-6">
               <div className="bg-gray-200 text-center text-xs font-bold p-1 border-b border-black">
                  Enclosure List (Self-Attested Photo Copies) <span className="font-bengali font-normal">(সংযুক্ত নথিপত্রের তালিকা (স্ব-প্রত্যয়িত প্রতিলিপি))</span> <br/>
                  Please tick appropriate boxes <span className="font-bengali font-normal">(অনুগ্রহ করে উপযুক্ত বক্সে টিক দিন)</span>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="border-r border-black">
                     <BooleanCheckbox 
                       checked={data.encMadhyamikAdmit} 
                       onChange={c => update('encMadhyamikAdmit', c)}
                       label={<span>1. Madhyamik or equivalent Admit Card <span className="font-bengali">(মাধ্যমিক বা সমতুল্য পরীক্ষার অ্যাডমিট কার্ড)</span></span>} 
                     />
                     <BooleanCheckbox 
                       checked={data.encMarkSheet} 
                       onChange={c => update('encMarkSheet', c)}
                       label={<span>2. Madhyamik or equivalent Mark Sheet <span className="font-bengali">(মাধ্যমিক বা সমতুল্য পরীক্ষার মার্কশিট)</span></span>} 
                     />
                     <BooleanCheckbox 
                       checked={data.encAadhaar} 
                       onChange={c => update('encAadhaar', c)}
                       label={<span>3. Copy of Aadhaar Card <span className="font-bengali">(আধার কার্ডের কপি)</span></span>} 
                     />
                  </div>
                  <div>
                    <BooleanCheckbox 
                       checked={data.encVoter} 
                       onChange={c => update('encVoter', c)}
                       label={<span>4. Copy of Voter Card <span className="font-bengali">(ভোটার কার্ডের কপি)</span></span>} 
                     />
                     <BooleanCheckbox 
                       checked={data.encPassbook} 
                       onChange={c => update('encPassbook', c)}
                       label={<span>5. First page of pass book/Cancelled cheque <span className="font-bengali">(ব্যাংক পাস বইয়ের প্রথম পাতা/বাতিল চেক)</span></span>} 
                     />
                     <BooleanCheckbox 
                       checked={data.encCaste} 
                       onChange={c => update('encCaste', c)}
                       label={<span>6. Copy of SC/ST/OBC Certificate <span className="font-bengali">(তপশিলি জাতি/উপজাতি/অন্যান্য শংসাপত্র)</span></span>} 
                     />
                  </div>
               </div>
            </div>

            {/* Declaration */}
            <div className="mb-6">
              <h4 className="font-bold text-sm underline">Self Declaration <span className="font-bengali font-normal">(স্ব-ঘোষণা)</span></h4>
              <p className="text-[10px] md:text-xs text-justify leading-tight mb-4">
                I hereby declare that <span className="font-bengali">(আমি এতদ্বারা ঘোষণা করছি যে)</span><br/>
                1. I am a permanent resident of West Bengal. <span className="font-bengali">(আমি পশ্চিমবঙ্গের স্থায়ী বাসিন্দা।)</span><br/>
                2. I am an unemployed person till date and I am not receiving any assistance under any social security scheme... 
                <span className="font-bengali"> (আমি অদ্যাবধি একজন বেকার এবং আমি পশ্চিমবঙ্গ সরকারের কোনো সামাজিক নিরাপত্তা প্রকল্প বা কোনো ভাতার আওতায় সাহায্য পাচ্ছি না...)</span><br/>
                3. All the information and documents submitted by me are correct... <span className="font-bengali">(আমার দ্বারা জমাকৃত সমস্ত তথ্য এবং নথিপত্র আমার জ্ঞান ও বিশ্বাস অনুযায়ী সত্য...)</span>
              </p>
              
              <div className="flex justify-between items-end mt-8">
                 <div>
                    <div className="text-xs font-bold mb-1">Date <span className="font-bengali font-normal">(তারিখ)</span></div>
                    <BoxInput length={12} value={data.declarationDate} onChange={v => update('declarationDate', v)} />
                    <input 
                      className="border-b border-black font-handwriting text-blue-700 w-32" 
                      value={data.declarationDate} 
                      onChange={e => update('declarationDate', e.target.value)} 
                    />
                 </div>
                 <div className="text-center">
                    <div className="h-8 mb-1 font-handwriting text-blue-700 text-xl">{data.beneficiaryName}</div>
                    <div className="border-t border-black pt-1 text-xs font-bold">Signature of Applicant <span className="font-bengali font-normal">(আবেদনকারীর স্বাক্ষর)</span></div>
                 </div>
              </div>
            </div>

            {/* Acknowledgement Cutoff */}
            <div className="border-t-2 border-dashed border-black my-4 relative">
               <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-2 text-xs italic">(To be perforated and handed over to beneficiary)</span>
            </div>

            {/* Acknowledgement */}
            <div className="border-2 border-black p-2 bg-yellow-50">
               <div className="text-center font-bold text-sm underline mb-2">Acknowledgement</div>
               
               <FormRow className="border-none mb-2">
                 <FormCell label="Duare Sarkar Registration no." value={data.duareSarkarRegNo} onChange={() => {}} className="border-b border-black" boxCount={18} />
               </FormRow>

               <div className="text-xs leading-loose">
                 I, <input className="border-b border-black bg-transparent font-handwriting text-blue-700 w-40 px-1 uppercase" value={data.ackName} onChange={e => update('ackName', e.target.value)} />, 
                 son/daughter/wife of <input className="border-b border-black bg-transparent font-handwriting text-blue-700 w-40 px-1 uppercase" value={data.ackRelationName} onChange={e => update('ackRelationName', e.target.value)} />, 
                 have submitted BANGLAR YUBA SATHI application on <input className="border-b border-black bg-transparent font-handwriting text-blue-700 w-24 px-1" value={data.ackDate} onChange={e => update('ackDate', e.target.value)} />.
                 <br/>
                 My mobile no. <input className="border-b border-black bg-transparent font-handwriting text-blue-700 w-32 px-1" value={data.ackMobile} onChange={e => update('ackMobile', e.target.value)} /> 
                 Aadhaar no. <input className="border-b border-black bg-transparent font-handwriting text-blue-700 w-40 px-1" value={data.ackAadhaar} onChange={e => update('ackAadhaar', e.target.value)} />
                 <FormCell label="Duare Sarkar Registration no." value={data.duareSarkarRegNo} onChange={() => {}} className="border-b border-black" />
               </FormRow>

               <div className="text-xs leading-loose">
                 I, <input className="border-b border-black bg-transparent font-handwriting text-blue-700 w-40" value={data.ackName} onChange={e => update('ackName', e.target.value)} />, 
                 son/daughter/wife of <input className="border-b border-black bg-transparent font-handwriting text-blue-700 w-40" value={data.ackRelationName} onChange={e => update('ackRelationName', e.target.value)} />, 
                 have submitted BANGLAR YUBA SATHI application on <input className="border-b border-black bg-transparent font-handwriting text-blue-700 w-24" value={data.ackDate} onChange={e => update('ackDate', e.target.value)} />.
                 <br/>
                 My mobile no. <input className="border-b border-black bg-transparent font-handwriting text-blue-700 w-32" value={data.ackMobile} onChange={e => update('ackMobile', e.target.value)} /> 
                 Aadhaar no. <input className="border-b border-black bg-transparent font-handwriting text-blue-700 w-40" value={data.ackAadhaar} onChange={e => update('ackAadhaar', e.target.value)} />
               </div>

               <div className="flex justify-between items-end mt-4">
                  <div className="text-xs">
                     Received on <input className="border-b border-black bg-transparent font-handwriting text-blue-700 w-24 px-1" value={data.ackReceivedDate} onChange={e => update('ackReceivedDate', e.target.value)} />
                     Received on <input className="border-b border-black bg-transparent font-handwriting text-blue-700 w-24" value={data.ackReceivedDate} onChange={e => update('ackReceivedDate', e.target.value)} />
                  </div>
                  <div className="text-center">
                     <div className="h-8"></div>
                     <div className="border-t border-black pt-1 text-xs font-bold">Signature of Receiving Official with seal</div>
                  </div>
               </div>
            </div>

        </div>

        {/* REQUIRED FOOTER - Visible on screen, hidden on print */}
        <div className="mt-8 mb-4 text-center font-bold text-sm bg-gray-100 p-4 border-t border-gray-300 no-print">
        {/* REQUIRED FOOTER */}
        <div className="mt-8 mb-4 text-center font-bold text-sm bg-gray-100 p-4 border-t border-gray-300">
           this website develop by arshed if you want to make a website in afordable price call or whatsapp 9038444838
        </div>
        
      </div>
    </div>
  );
}

export default App;
