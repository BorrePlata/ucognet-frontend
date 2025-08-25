import React from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneIcon from "@mui/icons-material/Phone";
import DownloadIcon from "@mui/icons-material/Download";
import samuelPlata from "../assets/images/samuel-plata.jpg"; // Imagen de Samuel Plata

const Header = styled(Box)({
  background: "linear-gradient(135deg, #1C2159 30%, #5E61F4 90%)",
  color: "#FFFFFF",
  textAlign: "center",
  padding: "40px 20px",
  borderRadius: "15px",
  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
  position: "relative",
});

const ProfileAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  margin: "0 auto",
  border: "5px solid #FFFFFF",
  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
});

const IconButtonStyled = styled(IconButton)({
  margin: "0 10px",
  backgroundColor: "transparent",
  color: "#FFFFFF",
  "&:hover": {
    color: "#66ddd5",
  },
});

const Section = styled(Box)({
  marginTop: "20px",
  padding: "20px",
  borderRadius: "15px",
  backgroundColor: "#1E2149",
  color: "#FFFFFF",
  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
});

const ContactButton = styled(Button)({
  marginTop: "20px",
  backgroundColor: "#5E61F4",
  color: "#FFFFFF",
  textTransform: "none",
  padding: "10px 20px",
  borderRadius: "25px",
  fontWeight: "bold",
  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
  "&:hover": {
    backgroundColor: "#3C4FB3",
  },
});

const downloadVCard = () => {
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Samuel Plata
TITLE:CTO de EfficientAI
TEL;TYPE=cell:5611680933
EMAIL:samuelplata@efficientai.es
URL:https://www.linkedin.com/in/samuel-plata-mart%C3%ADnez-2bb271108/
END:VCARD`;

  const blob = new Blob([vCardData], { type: "text/vcard" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "SamuelPlata.vcf";
  link.click();
};

const PersonalCard = () => {
  const isDesktop = useMediaQuery("(min-width:768px)");

  return (
    <Box sx={{ minHeight: "calc(100vh - 120px)", padding: "60px 20px 200px" }}>
      {/* Header */}
      <Header>
        <ProfileAvatar src={samuelPlata} alt="Samuel Plata" />
        <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: 2 }}>
          Samuel Plata
        </Typography>
        <Typography variant="subtitle1">CTO @ EfficientAI</Typography>
        <Box mt={2}>
          <IconButtonStyled
            href="https://wa.me/5611680933"
            target="_blank"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon />
          </IconButtonStyled>
          <IconButtonStyled href="tel:5611680933" aria-label="Phone">
            <PhoneIcon />
          </IconButtonStyled>
          <IconButtonStyled
            href="mailto:samuelplata@efficientai.es"
            aria-label="Email"
          >
            <EmailIcon />
          </IconButtonStyled>
          <IconButtonStyled
            href="https://www.linkedin.com/in/samuel-plata-mart%C3%ADnez-2bb271108/"
            target="_blank"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </IconButtonStyled>
        </Box>
        {/* Botón para descargar la vCard */}
        <ContactButton
          startIcon={<DownloadIcon />}
          onClick={downloadVCard}
          aria-label="Download vCard"
        >
          Descargar Contacto
        </ContactButton>
      </Header>

      {/* About Section */}
      <Section>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          About Me
        </Typography>
        <Typography variant="body1">
          I am Samuel Plata, CTO of EfficientAI, specializing in AI-driven solutions for business
          transformation. My expertise spans programming, marketing, and operational efficiency.
        </Typography>
      </Section>

      {/* Projects Section */}
      <Section>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Projects
        </Typography>
        <Typography variant="body1">
          I have led numerous AI initiatives, from automating workflows to implementing intelligent
          chatbots that enhance customer engagement.
        </Typography>
      </Section>

      {/* Tools Section */}
      <Section>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
          Tools & Skills
        </Typography>
        <Typography variant="body1">
          - Python <br />
          - Machine Learning <br />
          - Business Strategy <br />
          - AI Chatbots <br />
          - Marketing Optimization
        </Typography>
      </Section>
    </Box>
  );
};

export default PersonalCard;
