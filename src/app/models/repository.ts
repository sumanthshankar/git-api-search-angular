export interface Repository {
    name: string;
    full_name: string;
    owner: Owner;
    description: string;
    repositoryStars: number;
    repositoryForkedOrNot: string;
    license: License;
    fork: boolean;
    stargazers_count: string;
}

export interface Owner {
    login: number;
    url: string;
}

export interface License {
    name: string
}