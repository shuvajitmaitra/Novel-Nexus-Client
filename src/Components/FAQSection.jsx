// import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";

const data = {
    title: "FAQ about Library",
    rows: [
            {
              title: "How can I borrow a book from the library website?",
              content: "To borrow a book, log in to your account, search for the desired title, and click on the 'Borrow' button. Follow the prompts to confirm your selection, and the book will be added to your account."
            },
            {
              title: "What is the maximum loan period for borrowed books?",
              content: "The standard loan period for books is 21 days. You can check the due date in your account. If needed, you may renew the book if there are no pending holds."
            },
            {
              title: "How do I renew a borrowed book?",
              content: "To renew a book, log in to your account and navigate to your borrowed items. Find the book you wish to renew and click on the 'Renew' option. Please note that renewal is subject to availability and may be restricted based on library policies."
            },
            {
              title: "Can I reserve a book that is currently checked out by another user?",
              content: "Yes, you can place a hold on a checked-out book. Once the book becomes available, you will be notified, and it will be held for you for a specified period. You can manage your holds in your account."
            },
            {
              title: "How do I update my contact information in my library account?",
              content: "To update your contact information, log in to your account and go to the profile settings. Here, you can edit your personal details, including email address and phone number. Keeping your information current ensures you receive timely notifications from the library."
            }
    ],
  
};

const styles = {
    bgColor: 'white',
    titleTextColor: "#4B6BFB",
    rowTitleColor: "black",
    rowContentColor: 'grey',
    // arrowColor: "red",
    
};

const config = {
    animate: true,
    arrowIcon: "⬇️",
    tabFocus: true
};

const FAQSection = () => {


    return(
        <div className="max-w-screen-lg mx-auto">
            <h1 className="text-3xl md:text-5xl py-6 font-bold text-primary text-center space-y-4">
       FAQ SECTION
      </h1>
            <Faq
                data={data}
                styles={styles}
                config={config}
               
            />
        </div>
    )}
export default FAQSection;