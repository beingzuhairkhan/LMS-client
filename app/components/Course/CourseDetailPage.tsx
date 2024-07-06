"use client";
import React , {FC , useState , useEffect} from 'react'
import Loader from '../../components/Loader/Loader';
import Heading from '../../utils/Heading';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';
import CourseDetails from '../../components/Course/CourseDetails';
import { useGetCoursesDetailsQuery } from '../../../redux/features/courses/coursesAPI';
import {useGetStripePublishableKeyQuery , useCreatePaymentIntentMutation} from "../../../redux/features/Orders/orderApi"
import {loadStripe} from '@stripe/stripe-js'

type Props = {
  id: string;
};

const CourseDetailPage: FC<Props> = ({ id }) => {
    console.log(id)
    const [route , setRoute] = useState("Login")
    const [open, setOpen] = useState(false)

    const { data, isLoading } = useGetCoursesDetailsQuery(id);
    const {data:confiq } = useGetStripePublishableKeyQuery({});
    const [stripePromise , setStripePromise] = useState<any>(null)
    const [clientSecret , setClientSecret] = useState(' ')
    const [createPaymentIntent , {data:paymentIntentData}] = useCreatePaymentIntentMutation()

    useEffect(()=>{
      if(confiq){
        const publishablekey = confiq?.publishableKey;
        setStripePromise(loadStripe(publishablekey))
      }
      if(data){
        const amount = Math.round(data.course.price * 100);
        createPaymentIntent(amount)
      }

    },[confiq , data])

    useEffect(()=>{
      if(paymentIntentData){
        setClientSecret(paymentIntentData?.client_secret)
      }

    },[paymentIntentData])

    if (isLoading) {
      return <Loader />;
    }
  
    // Ensure data.course exists and is structured as expected
    if (!data || !data.course) {
      return <div>Error: Course not found.</div>;
    }
  
  
  return (
    <>
    
      <Heading
        title={data.course.name + ' - ELearning'}
        description={'Elearning is a platform for students to learn and get help from teachers'}
        keywords={data?.courses?.tags}
      />
      <Header route={route} setRoute={setRoute} open={open} setOpen={setOpen} activeItem={1} /> 
  {
    stripePromise && (
      <CourseDetails data={data?.course}  setRoute={setRoute}  setOpen={setOpen} stripePromise={stripePromise} clientSecret={clientSecret} />
    )
  }
      <Footer />
    </>
  );
};

export default CourseDetailPage;