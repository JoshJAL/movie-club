export type Club = {
  id: number;
  name: string;
  description: string;
  tags: string;
  createdAt: string;
};

export type ClubCreate = {
  name: string;
  description: string;
  tags: string;
};
