export interface UserLight extends Model {
    name: string;
    profile_picture_path: string;
}

export interface Task extends Model {
    subject: string;
    message: string;
    organisation?: string;
    contact_information: string;
    date_start: string;
    date_end: string;
    created_at: string;
    active: boolean;
    user: UserLight;
}

export interface Model {
    id: number;
}

export interface PaginatedTasks {
    current_page: number;
    data: Task[];
    from: number;
    last_page: number;
    last_page_url: string;
    links: PageLink[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface PaginatedModel<Model> {
    current_page: number;
    data: Model[];
    from: number | null;
    last_page: number;
    last_page_url: string | null;
    links: PageLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

export interface PageLink {
    active: boolean;
    label: string;
    page: number;
    url: string | null;
}
