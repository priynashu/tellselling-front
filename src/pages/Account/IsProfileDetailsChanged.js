export const isChanged = (formData, originalData) => {
  let result = false;
  if (formData.profilePhoto !== '' && formData.profilePhoto !== originalData.profilePhoto) {
    return true;
  }
  if (
    formData.firstName.trim() !== originalData.firstName.trim() ||
    formData.lastName.trim() !== originalData.lastName.trim()
  ) {
    result = true;
  }
  if (
    (formData.currentPassword?.trim() !== '' || formData.newPassword?.trim() !== '') &&
    formData.currentPassword?.trim() !== formData.newPassword?.trim()
  ) {
    result = true;
  }

  return result;
};
