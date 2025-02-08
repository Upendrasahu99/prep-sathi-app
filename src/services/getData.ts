// App write data calll

import {databases} from '../utils/appwrite/config'

const getSubjects = async () => {
  const subjects = await databases.listDocuments(
    import.meta.env.VITE_DATABASE_ID,
    import.meta.env.VITE_COLLECTION_ID_SUBJECT
  )
  console.log(subjects.documents);
  return subjects.documents;
}


export {getSubjects}

