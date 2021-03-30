import { getMongoRepository, MongoRepository } from "typeorm";

import ICreateNotificationDTO from "@modules/notifications/dto/ICreateNotificationDTO";
import INotificationsRepository from "../../../repositories/INotificationsRepository";

import Notification from "../schemas/Notification";

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, "Mongo");
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
