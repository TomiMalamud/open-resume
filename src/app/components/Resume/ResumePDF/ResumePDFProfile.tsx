import { View } from "@react-pdf/renderer";
import {
  ResumePDFIcon,
  type IconType,
} from "components/Resume/ResumePDF/common/ResumePDFIcon";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import {
  ResumePDFLink,
  ResumePDFSection,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import type { ResumeProfile } from "lib/redux/types";

export const ResumePDFProfile = ({
  profile,
  themeColor,
  isPDF,
}: {
  profile: ResumeProfile;
  themeColor: string;
  isPDF: boolean;
}) => {
  const { name, email, phone, url, linkedin, summary, location } = profile;
  const iconProps = { email, phone, location, url, linkedin };
  const urlRegex = /^(https?:\/\/)?[a-zA-Z0-9][a-zA-Z0-9-]*\.[a-zA-Z0-9][a-zA-Z0-9-.]+[a-zA-Z0-9-]*\/?$/

  return (
    <ResumePDFSection style={{ marginTop: spacing["4"] }}>
      <ResumePDFText
        bold={true}
        themeColor={themeColor}
        style={{ fontSize: "20pt" }}
      >
        {name}
      </ResumePDFText>
      {summary && <ResumePDFText>{summary}</ResumePDFText>}
      <View
        style={{
          ...styles.flexRowBetween,
          flexWrap: "wrap",
          marginTop: spacing["0.5"],
        }}
      >
        {Object.entries(iconProps).map(([key, value]) => {
          if (!value) return null;

          let iconType = key as IconType;
          if (key === "url" || key === "linkedin") {
            if (value.includes("github")) {
              iconType = "url_github";
            } else if (value.includes("linkedin")) {
              iconType = "url_linkedin";
            }
          }

          const shouldUseLinkWrapper = ["email", "url", "linkedin", "phone"].includes(key);
          const Wrapper = ({ children }: { children: React.ReactNode }) => {
            if (!shouldUseLinkWrapper) return <>{children}</>;
          
            let src = "";
            const trimmedValue = value.trim(); // Remove whitespaces from both ends
          
            // Optional: Validate the URL if needed
            const isValidURL = urlRegex.test(trimmedValue);
          
            switch (key) {
              case "email": {
                src = `mailto:${trimmedValue}`;
                break;
              }
              case "phone": {
                src = `tel:${trimmedValue.replace(/[^\d+]/g, "")}`; // Keep only + and digits
                break;
              }
              case "linkedin": {
                src = trimmedValue.startsWith("http") ? trimmedValue : `https://${trimmedValue}`;
                break;
              }
              default: {
                if (isValidURL) {
                  src = trimmedValue.startsWith("http") ? trimmedValue : `https://${trimmedValue}`;
                } else {
                  <p>Error</p>
                }
                break;
              }
            }

            return (
              <ResumePDFLink src={src} isPDF={isPDF}>
                {children}
              </ResumePDFLink>
            );
          };

          return (
            <View
              key={key}
              style={{
                ...styles.flexRow,
                alignItems: "center",
                gap: spacing["1"],
              }}
            >
              <ResumePDFIcon type={iconType} isPDF={isPDF} />
              <Wrapper>
                <ResumePDFText>{value}</ResumePDFText>
              </Wrapper>
            </View>
          );
        })}
      </View>
    </ResumePDFSection>
  );
};
