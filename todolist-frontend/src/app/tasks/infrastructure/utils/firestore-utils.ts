export function convertFirestoreTimestampToDate(task: any): any {
  return {
    ...task,
    createdDate: new Date(task.createdDate._seconds * 1000 + task.createdDate._nanoseconds / 1000000),
  };
}