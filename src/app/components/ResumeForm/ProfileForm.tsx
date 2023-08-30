import { BaseForm } from "components/ResumeForm/Form";
import { Input, Textarea } from "components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeProfile, selectProfile } from "lib/redux/resumeSlice";
import { ResumeProfile } from "lib/redux/types";

export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const { name, email, phone, url, linkedin, summary, location } = profile;
  const urlRegex = /^(https?:\/\/)?[a-zA-Z0-9][a-zA-Z0-9-]*\.[a-zA-Z0-9][a-zA-Z0-9-.]+[a-zA-Z0-9-]*\/?$/;

  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    let isValid = true;
  
    // Validate the URL if the field is 'url' or 'linkedin'
    if (field === "url" || field === "linkedin") {
      isValid = urlRegex.test(value.trim());
  
      if (!isValid) {
        // Provide a UI indication to inform the user of invalid input
        // For example: setValidationError("Invalid URL");
        return;
      }
    }
  
    // If valid, dispatch the change
    if (isValid) {
      dispatch(changeProfile({ field, value: value.trim() }));
    }
  };
  

  return (
    <BaseForm>
      <div className="grid grid-cols-6 gap-3">
        <Input
          label="Name"
          labelClassName="col-span-full"
          name="name"
          placeholder="Sal Khan"
          value={name}
          onChange={handleProfileChange}
        />
        <Textarea
          label="Objective"
          labelClassName="col-span-full"
          name="summary"
          placeholder="Entrepreneur and educator obsessed with making education free for anyone"
          value={summary}
          onChange={handleProfileChange}
        />
        <Input
          label="Email"
          labelClassName="col-span-4"
          name="email"
          placeholder="hello@khanacademy.org"
          value={email}
          onChange={handleProfileChange}
        />
        <Input
          label="Phone"
          labelClassName="col-span-2"
          name="phone"
          placeholder="(123)456-7890"
          value={phone}
          onChange={handleProfileChange}
        />
        <Input
          label="Website"
          labelClassName="col-span-4"
          name="url"
          placeholder="github.com/khanacademy"
          value={url}
          onChange={handleProfileChange}
        />
        <Input
          label="Location"
          labelClassName="col-span-2"
          name="location"
          placeholder="NYC, NY"
          value={location}
          onChange={handleProfileChange}
        />
        <Input
          label="LinkedIn" // New input field
          labelClassName="col-span-4"
          name="linkedin" // New field
          placeholder="linkedin.com/in/khanacademy"
          value={linkedin} // New field
          onChange={handleProfileChange}
        />
      </div>
    </BaseForm>
  );
};
