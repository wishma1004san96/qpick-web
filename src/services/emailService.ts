import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';


const SERVICE_ID = "service_06q07p6";
const TEMPLATE_ID = "template_pjahzta";
const PUBLIC_KEY = "KLPIE9S_ejtIM4_PL";

interface EmailData {
  name: string;
  email: string;
  phone: string;
  country: string;
  persons: string;
  days: string;
  message: string;
  subject?: string;
  details?: string;
}

interface TailorMadeTourData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  arrivalDate: string;
  duration: string;
  adultCount: string;
  childrenCount: string;
  selectedInterests: string[];
  dreamTrip: string;
}

export const sendEmail = async (data: EmailData): Promise<boolean> => {
  let toastId: string | number;

  try {
    
    toastId = toast.loading("Sending your message...", {
      position: "bottom-right",
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      closeButton: false
    });

    emailjs.init(PUBLIC_KEY);

    
    const formattedDetails = `
Hello Admin,

You got a new message from ${data.name}:

Contact Details:
---------------
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Country: ${data.country}
Number of Persons: ${data.persons}
Number of Days: ${data.days}

Message:
--------
${data.message}

${data.details ? `Additional Details:
-----------------
${data.details}` : ''}
    `.trim();

    const templateParams = {
      to_name: "Admin",
      from_name: data.name,
      from_email: data.email,
      message: formattedDetails,
      subject: data.subject || "New Contact Form Submission"
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    if (response.status === 200) {
      toast.update(toastId, {
        render: "Message sent successfully! We will contact you soon.",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
        draggable: true,
        position: "bottom-right"
      });
      return true;
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    console.error('Message sending failed:', error);
    toast.update(toastId!, {
      render: "Failed to send message. Please try again later.",
      type: "error",
      isLoading: false,
      autoClose: 5000,
      closeButton: true,
      draggable: true,
      position: "bottom-right"
    });
    return false;
  }
};

export const sendTailorMadeTourEmail = async (data: TailorMadeTourData): Promise<boolean> => {
  let toastId: string | number;

  try {
    toastId = toast.loading("Sending your tour request...", {
      position: "bottom-right",
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      closeButton: false
    });

    emailjs.init(PUBLIC_KEY);

    // Format interests for display
    const interestLabels: { [key: string]: string } = {
      cultural: 'Cultural Sites',
      wildlife: 'Wildlife & Safari',
      beaches: 'Beaches & Coast',
      adventure: 'Adventure Sports',
      tea: 'Tea Plantations',
      food: 'Food & Cuisine',
      photography: 'Photography',
      wellness: 'Wellness & Spa'
    };

    const formattedInterests = data.selectedInterests
      .map(id => interestLabels[id] || id)
      .join(', ') || 'None selected';

    const formattedDetails = `
Hello Admin,

You received a new TAILOR MADE TOUR REQUEST from ${data.fullName}:

Personal Information:
--------------------
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Country: ${data.country}

Travel Details:
--------------
Arrival Date: ${data.arrivalDate}
Duration: ${data.duration} days
Number of Adults: ${data.adultCount}
Number of Children: ${data.childrenCount || '0'}

Interests:
----------
${formattedInterests}

Dream Trip Description:
----------------------
${data.dreamTrip}
    `.trim();

    const templateParams = {
      to_name: "Admin",
      from_name: data.fullName,
      from_email: data.email,
      message: formattedDetails,
      subject: "New Tailor Made Tour Request"
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    if (response.status === 200) {
      toast.update(toastId, {
        render: "Tour request sent successfully! We'll get back to you soon with a customized itinerary.",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
        draggable: true,
        position: "bottom-right"
      });
      return true;
    } else {
      throw new Error('Failed to send tour request');
    }
  } catch (error) {
    console.error('Tour request sending failed:', error);
    toast.update(toastId!, {
      render: "Failed to send tour request. Please try again later.",
      type: "error",
      isLoading: false,
      autoClose: 5000,
      closeButton: true,
      draggable: true,
      position: "bottom-right"
    });
    return false;
  }
};