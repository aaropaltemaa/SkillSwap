import { useEffect, useState } from "react";

const UserProfilePage = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <>
      <section className="max-w-2xl mx-auto text-center py-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          {user.name}
        </h1>
        <h2 className="mt-2 text-lg text-gray-500">@{user.username}</h2>
        <div className="mt-4 border-t border-gray-200 w-16 mx-auto" />
      </section>
      <section className="max-w-2xl mx-auto py-6">
        <h3 className="text-xl font-semibold mb-2">Skills Offered</h3>
      </section>
    </>
  );
};

export default UserProfilePage;
