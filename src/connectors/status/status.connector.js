const storedStatus = {
  submissionsReceived: 0,
  authenticationsPassed: 0,
  authenticationsBlocked: 0,
  fsaRnCallsSucceeded: 0,
  fsaRnCallsFailed: 0,
  mostRecentFsaRnCallSucceeded: true,
  tascomiCreateRegistrationCallsSucceeded: 0,
  tascomiCreateRegistrationCallsFailed: 0,
  mostRecentTascomiCreateRegistrationSucceeded: true,
  tascomiCreateRefnumberCallsSucceeded: 0,
  tascomiCreateRefnumberCallsFailed: 0,
  mostRecentTascomiCreateRefnumberSucceeded: true,
  storeRegistrationsInDbSucceeded: 0,
  storeRegistrationsInDbFailed: 0,
  mostRecentStoreRegistrationInDbSucceeded: true,
  storeRegistrationsInCacheSucceeded: 0,
  storeRegistrationsInCacheFailed: 0,
  mostRecentRegistrationInCacheSucceeded: true,
  getConfigFromDbSucceeded: 0,
  getConfigFromDbFailed: 0,
  mostRecentGetConfigFromDbSucceeded: true,
  emailNotificationsSucceeded: 0,
  emailNotificationsFailed: 0,
  mostRecentEmailNotificationSucceeded: true,
  endToEndRegistrationsSucceeded: 0,
  endToEndRegistrationsFailed: 0,
  mostRecentEndToEndRegistrationSucceeded: true
};

const getStoredStatus = async () => storedStatus;

const updateStoredStatus = async (statusName, newStatus) => {
  storedStatus[statusName] = newStatus;
  return storedStatus[statusName];
};

module.exports = { getStoredStatus, updateStoredStatus };