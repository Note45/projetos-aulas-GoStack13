import { container } from "tsyringe";

import IStorageProvide from "./StorageProvider/models/IStorageProvide";
import DiskStorageProvider from "./StorageProvider/implementations/DiskStorageProvider";

import IMailProvider from "./MailProvider/models/IMailProvider";
import EtherealMailProvider from "./MailProvider/implementations/EtherealMailProvider";

container.registerSingleton<IStorageProvide>(
  "StorageProvider",
  DiskStorageProvider
);

container.registerSingleton<IMailProvider>(
  "MailProvider",
  EtherealMailProvider
);
