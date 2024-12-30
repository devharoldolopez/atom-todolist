import * as logger from "firebase-functions/logger";
import { FirebaseConfig } from '../config/firebase.config';
import { CommonConstants } from '../../constants/general/app.constants';
import { UserErrorsConstants } from '../../constants/errors/user-errors.constants';
import { TasksRepository } from '../../application/tasks/interfaces/tasks-repository.interface';
import { Task } from '../../domain/tasks/tasks.entity';
import { ErrorService } from "../services/error.service";


export class FirestoreTasksRepository implements TasksRepository {

  private readonly tasksCollection = FirebaseConfig.getFirestore().collection(CommonConstants.TASKS_COLLECTION);

  async getTasksByUser(userId:string): Promise<Task[]> {

    logger.info('Entro a getTasksByUser: ', userId);

    const tasksSnapshot = await this.tasksCollection.where(CommonConstants.TASKS_USER_ID_FIELD, '==', userId).get();

    logger.info('tasksSnapshot: ', tasksSnapshot)

    if(tasksSnapshot.empty)
      ErrorService.throwNotFound(UserErrorsConstants.TASKS_NOT_FOUND)

    return tasksSnapshot.docs.map(doc => this.toDomain(doc));
    
  }

  async insertTask(userId: string, task: Task): Promise<Task> {
    logger.info('Entro a insertUsers: ', userId);
    logger.info('task value: ', task)

    const {title, description, state} = task; 

    const newTask = {
      title,
      description,
      state,
      createdDate: new Date(),
      userId
    };

    const taksDocRef = await this.tasksCollection.add(newTask)

    return this.toDomain(await taksDocRef.get());
  }

  async updateTask(task: Task): Promise<Task> {
    logger.info('Entro a updateTask: ', task);

    if (!task.id) {
      ErrorService.throwValidationError(UserErrorsConstants.TASK_ID_FIELD_REQUIRED)
    }

    logger.info('Entro a updateTask: ', task.id);
    const taskDocRef = this.tasksCollection.doc(task.id);
    const taskDoc = await taskDocRef.get();

    if(!taskDoc.exists)
      ErrorService.throwNotFound(UserErrorsConstants.TASK_NOT_FOUND)

    const {title, description, state} = task; 

    await taskDocRef.update({
      title,
      description,
      state,
    });

    return this.toDomain(await taskDocRef.get());
  }

  async deleteTask(id:string): Promise<void> {
    logger.info('Entro a deleteTask');
    const docRef = this.tasksCollection.doc(id);
    const doc = await docRef.get();
    if(!doc.exists)
      throw new Error(UserErrorsConstants.TASKS_DELETED_NOT_EXISTS)

    await docRef.delete();
  }

  private toDomain(doc: FirebaseFirestore.DocumentSnapshot): Task {
    const data = doc.data();
    if (!data) throw new Error(UserErrorsConstants.DOCUMENT_NOT_DEFINED);
    return new Task(data.title, data.description, data.state, data.createdDate, doc.id);
  }
}