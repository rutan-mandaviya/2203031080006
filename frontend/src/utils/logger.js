export const logEvent = (type, message, data = null) => {
  const timestamp = new Date().toISOString();
  const entry = {type,timestamp,message,...(data && { data })
  };

  window.customLogs = window.customLogs || [];
  window.customLogs.push(entry);
};
