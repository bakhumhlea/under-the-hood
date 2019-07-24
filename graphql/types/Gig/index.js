export default `
  type Gig {
    _id: String
    owner: User
    title: String!
    desc: String
    tools: [Tool]!
    likes: Like
    views: View
  }
  type Tool {
    name: String
  }
 
  type Like {
    count: Int
    people: [People]
  }

  type View {
    count: Int
    people: [People]
  }

  type People {
    uid: String
  }

  type Query {
    gig(_id: String!): Gig
    gigs: [Gig]
  }

  type Mutation {
    createGig(owner: String!, title: String!, desc: String, tools: [String]): Gig
    editGig(_id: String!, title: String!, desc: String, tools: [String]): Gig
    deleteGig(_id: String!, uid: String!): Gig
    likesGig(_id: String!, uid: String!): Gig
  }
`;