import React from "react";

import {
  StripeProvider as StripeRNProvider,
  useStripe,
} from "@stripe/stripe-react-native";
const StripeProvider = ({ children }) => {
  const { init, initPaymentSheet } = useStripe();

  // Replace with your actual publishable key
  const publishableKey =
    "pk_test_51NeuSOJB1CqgCZC31h73UBbeZBCSmUn5xO1nMuKCQf1kinXbF1wXpI6spnfxi6W1DrxqxiRK9WOsOsoSYA7QYaMq00imwujCTG";

  React.useEffect(() => {
    init({
      publishableKey,
    });

    // Call initPaymentSheet with the actual PaymentIntent client secret from your server
    async function initializePaymentSheet() {
      try {
        const { error } = await initPaymentSheet({
          paymentIntentClientSecret:
            "sk_test_51NeuSOJB1CqgCZC3UMECxeKpTdQSPUupk7UcHTMAvHIGv2nbXeV10SWaELrDkGaci9CIoePsu5rTXmHYMSXTa5HB005xjCUrxm", // Replace with your actual PaymentIntent client secret
        });
        if (error) {
          console.error("Error initializing payment sheet:", error);
        }
      } catch (error) {
        console.error("Error initializing payment sheet:", error);
      }
    }

    initializePaymentSheet();
  }, []);

  return (
    <StripeRNProvider publishableKey={publishableKey}>
      {children}
    </StripeRNProvider>
  );
};

export default StripeProvider;
