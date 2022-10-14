import Alert from '@mui/material/Alert';

// Alert box
export const handleAlert = (message, type, setIsAlert) => {
  setTimeout(() => {
    setIsAlert(() => {
      return { alert: false };
    });
  }, 3000);
  return (
    <Alert
      style={{
        width: '24em',
        position: 'absolute',
        bottom: '14em',
        transition: 'all ease-in-out 1s',
      }}
      variant="filled"
      severity={type}
    >
      {message}
    </Alert>
  );
};
