import MyCalendar from '@/app/components/myCalender'
import React from 'react';
import GraphScheduleModal from './component/ScheduleCrediantialmodal';
import { postRequest } from '@/lib/api.service';

export default async function SchedulePage() {
  // const [openModal,setModal] = useState(true);


 
  const closeModal = () =>{
    return false;
  }
  return (
    <div className='w-full px-5'>
        <MyCalendar />

        <GraphScheduleModal />
    </div>
  )
}
