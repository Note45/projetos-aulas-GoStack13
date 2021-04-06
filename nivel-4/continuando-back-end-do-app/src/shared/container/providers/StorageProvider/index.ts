import { container } from "tsyringe";

import IStorageProvide from "./models/IStorageProvide";
import DiskStorageProvider from "./implementations/DiskStorageProvider";

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<IStorageProvide>("StorageProvider", providers.disk);
