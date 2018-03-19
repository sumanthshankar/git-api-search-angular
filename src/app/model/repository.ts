export interface Repository {
    name: string;

    full_name: String;

    owner: Owner;

    description: String;

    repositoryStars: number;

    repositoryForkedOrNot: String;

    license: License;
    
    fork: boolean;

    stargazers_count: String;

}

export interface Owner {
    login: number;
    url: String;
}

export interface License {
    name: String
}