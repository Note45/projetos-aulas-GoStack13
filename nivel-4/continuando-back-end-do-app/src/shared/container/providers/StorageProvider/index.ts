import { container } from "tsyringe";
import uploadConfig from "@config/upload";

import IStorageProvide from "./models/IStorageProvide";
import DiskStorageProvider from "./implementations/DiskStorageProvider";
import S3StorageProvider from "./implementations/S3StorageProvider";

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvide>(
  "StorageProvider",
  providers[uploadConfig.driver]
);
