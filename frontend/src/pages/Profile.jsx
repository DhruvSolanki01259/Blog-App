import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/auth.store";
import {
  Mail,
  User,
  Calendar,
  LogOut,
  Edit,
  Github,
  Linkedin,
  Twitter,
  Link,
  Phone,
  LogIn,
} from "lucide-react";
import toast from "react-hot-toast";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: "easeOut", delay },
});

const Profile = () => {
  const { user, logout, isLoading } = useAuthStore();
  const [showEditor, setShowEditor] = useState(false);

  if (!user) return null;

  return (
    <section className='min-h-screen w-full flex justify-center py-16 px-4 bg-[#FBF9F2]'>
      <motion.div
        {...fadeUp(0)}
        className='relative w-full max-w-5xl bg-white/95 rounded-3xl p-6 sm:p-10 border border-[#E9E2CE] shadow-lg'>
        {/* Logout button */}
        <button
          disabled={isLoading}
          onClick={async () => {
            try {
              await logout();
              toast.success("Logged out successfully 👋");
            } catch {
              toast.error("Logout failed. Try again.");
            }
          }}
          className='absolute top-5 right-5 px-4 py-2 text-xs sm:text-sm bg-[#FFF5EB] border border-[#EADFCB] text-[#6F6652] rounded-lg hover:bg-[#FA9500]/90 hover:text-white transition-all flex items-center gap-2 shadow-sm whitespace-nowrap'>
          <LogOut size={16} />
          {isLoading ? "Logging out..." : "Logout"}
        </button>

        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-3xl sm:text-4xl font-extrabold text-[#2B2B2B] leading-tight'>
            <span className='bg-gradient-to-r from-[#FA9500] to-[#EB6424] bg-clip-text text-transparent'>
              My Profile
            </span>
          </h1>
          <p className='mt-2 text-[#6F6652] text-[13px] sm:text-[15px] font-medium'>
            Manage and showcase your personal details
          </p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "170px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className='h-[3px] bg-gradient-to-r from-[#FA9500] to-[#EB6424] rounded-full mx-auto mt-4'
          />
        </div>

        {/* Profile Block */}
        <div className='flex flex-col sm:flex-row items-center gap-8 mb-12 w-full'>
          <motion.img
            {...fadeUp(0.1)}
            src={user?.profilePic || "/default-avatar.png"}
            alt={user.username}
            className='w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover border-[6px] border-[#E9E2CE] shadow-md'
          />

          <motion.div
            {...fadeUp(0.2)}
            className='flex flex-col w-full gap-3 relative'>
            {/* Username container */}
            <div className='relative w-max'>
              <h2 className='text-2xl sm:text-3xl font-bold text-[#7C6A0A]'>
                {user.username}
              </h2>

              {/* Superscript Role Badge */}
              <span
                className={`absolute -top-3 -right-10 text-[9px] uppercase font-semibold px-2 py-[2px] rounded-full tracking-wide
                ${
                  user.role === "admin"
                    ? "bg-[#FA9500]/20 text-[#FA9500] border border-[#FA9500]"
                    : "bg-[#E9E2CE] text-[#6F6652] border border-[#D5CDBD]"
                }`}>
                {user.role}
              </span>
            </div>

            <p className='text-[#5C4E3C] font-medium text-sm sm:text-base max-w-md'>
              {user?.bio || "Just getting started in the digital world 🚀"}
            </p>

            {/* Actions Row - Buttons aligned right */}
            <div className='flex justify-end gap-3 mt-3'>
              {/* Edit Profile */}
              <button
                onClick={() => setShowEditor(true)}
                className='px-5 py-2.5 inline-flex items-center gap-2 bg-white border border-[#EADFCB] rounded-xl text-[#6F6652] font-medium text-sm hover:bg-[#FA9500] hover:text-white transition-all shadow-sm'>
                <Edit size={16} />
                Edit Profile
              </button>

              {/* Only Admin Sees Dashboard */}
              {user.role === "admin" && (
                <motion.button
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35, type: "spring" }}
                  onClick={() => {
                    toast.success("Redirecting...");
                    window.location.href = "/admin/dashboard";
                  }}
                  className='px-5 py-2.5 inline-flex items-center gap-2 rounded-xl text-sm font-medium shadow-sm bg-[#EB6424] text-white hover:bg-[#FA9500] transition-all'>
                  🧩 Go to Dashboard
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Account Info */}
        <motion.div
          {...fadeUp(0.25)}
          className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10'>
          <InfoItem
            icon={<Mail />}
            label='Email'
            value={user.email}
          />
          <InfoItem
            icon={<User />}
            label='Gender'
            value={user.gender === "boy" ? "Male" : "Female"}
          />
          <InfoItem
            icon={<LogIn />}
            label='Last Login'
            value={
              user.lastLogin
                ? new Date(user.lastLogin).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                : "Not logged in Yet"
            }
          />

          <InfoItem
            icon={<Calendar />}
            label='Joined'
            value={new Date(user.createdAt).toDateString()}
          />
        </motion.div>

        {/* Social Links */}
        <motion.div {...fadeUp(0.35)}>
          <h3 className='text-lg font-semibold text-[#7C6A0A] mb-3'>
            Social Connections
          </h3>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <InfoItem
              icon={<Github />}
              label='GitHub'
              value={user.github || "Not added"}
            />
            <InfoItem
              icon={<Linkedin />}
              label='LinkedIn'
              value={user.linkedin || "Not added"}
            />
            <InfoItem
              icon={<Twitter />}
              label='Twitter'
              value={user.twitter || "Not added"}
            />
            <InfoItem
              icon={<Link />}
              label='Portfolio'
              value={user.portfolio || "Not added"}
            />
          </div>
        </motion.div>
      </motion.div>

      {showEditor && (
        <EditProfileModal
          user={user}
          close={() => setShowEditor(false)}
        />
      )}
    </section>
  );
};

export default Profile;

/* ========== REUSABLE INFO CARD ========== */
const InfoItem = ({ icon, label, value }) => (
  <div className='flex items-center gap-4 p-4 rounded-xl border border-[#EADFCB] bg-white/75 shadow-sm hover:shadow-md transition-all'>
    <span className='text-[#C67A0E] shrink-0'>{icon}</span>
    <div className='overflow-hidden'>
      <p className='text-[10px] font-semibold uppercase tracking-wide text-[#8A7E6A]'>
        {label}
      </p>
      <p className='text-sm font-medium text-[#2A2A2A] break-all line-clamp-2'>
        {value}
      </p>
    </div>
  </div>
);

/* ========== EDIT MODAL ========== */
const EditProfileModal = ({ user, close }) => {
  const [formData, setFormData] = useState({
    bio: user?.bio || "",
    github: user?.github || "",
    linkedin: user?.linkedin || "",
    twitter: user?.twitter || "",
    portfolio: user?.portfolio || "",
  });

  const handleSave = () => {
    toast.success("Changes saved (UI-only) ⚡");
    close();
  };

  return (
    <div className='fixed inset-0 bg-black/30 flex justify-center items-center p-4 z-50 backdrop-blur-sm'>
      <div className='w-full max-w-md rounded-2xl bg-white border border-[#E9E2CE] p-6 space-y-4 shadow-xl'>
        <h2 className='text-lg font-bold text-[#7C6A0A]'>Edit Profile</h2>

        {Object.keys(formData).map((key) => (
          <input
            key={key}
            placeholder={key.toUpperCase()}
            value={formData[key]}
            onChange={(e) =>
              setFormData({ ...formData, [key]: e.target.value })
            }
            className='w-full border border-[#EADFCB] rounded-lg px-3 py-2 text-sm bg-[#FFFCF7] focus:ring-2 focus:ring-[#EB6424]/40 outline-none'
          />
        ))}

        <div className='flex justify-end gap-3 pt-2'>
          <button
            onClick={close}
            className='px-4 py-2 rounded-lg text-sm bg-gray-200'>
            Cancel
          </button>
          <button
            onClick={handleSave}
            className='px-4 py-2 rounded-lg text-sm bg-[#FA9500] text-white'>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
