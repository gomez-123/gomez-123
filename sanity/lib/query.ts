import { groq } from "next-sanity";
import { client } from "./client";

export async function getAttendances() {
  return client.fetch(
    groq`*[_type == "attendance"] | order(titlecheckInTime asc){
    _id,
    employee->{
      name,
      dni,
      "mainImage": mainImage.asset->{
        url,
        metadata {
          lqip
      }
    },
    },
    checkInTime,
    shift,
    status,
    permissionDetails,
    associationVisit->{
      title
    }
  }`,
    { Cache: "force-cache" },
    { next: { tags: ["attendances"] } }
  );
}
