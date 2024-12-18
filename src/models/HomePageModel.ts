// src/models/HomepageModel.ts
export class HomePageModel {
    username: string;
    currentPhase: string;
  
    constructor(username: string = "User", currentPhase: string = "fase menstruasi") {
      this.username = username;
      this.currentPhase = currentPhase;
    }
  }
  