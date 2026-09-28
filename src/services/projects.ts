import { api } from "./api";

export type Project = {
  id: number;
  owner_id: number;
  slug: string;
  title: string;
  tagline: string;
  description_md: string;
  tech: string[];
  github_url: string | null;
  demo_url: string | null;
  is_published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
};

export async function getProjects() {
  const response = await api.get<Project[]>("/api/projects");
  return response.data;
}

export async function toggleProjectPublish(projectId: number) {
  const response = await api.patch<Project>(
    `/api/projects/${projectId}/publish`,
  );

  return response.data;
}

export type ProjectMedia = {
  id: number;
  project_id: number;
  path: string;
  alt: string | null;
  position: number;
};

export async function uploadProjectMedia(projectId: number, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<ProjectMedia>(
    `/api/projects/${projectId}/media`,
    formData,
  );

  return response.data;
}

export async function deleteProjectMedia(projectId: number, mediaId: number) {
  await api.delete(`/api/projects/${projectId}/media/${mediaId}`);
}
