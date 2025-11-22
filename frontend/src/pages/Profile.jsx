import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/auth.store";
import { useProfileStore } from "../store/profile.store";
import { useThemeStore } from "../store/theme.store"; // <- theme store
import { BsGithub, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { FiLink, FiXCircle } from "react-icons/fi";
import { Mail, User, Calendar, LogOut, Edit, LogIn } from "lucide-react";
import toast from "react-hot-toast";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: "easeOut", delay },
});

const Profile = () => {
  const { bio, github, linkedin, twitter, portfolio } = useProfileStore();
  const { user, logout, isLoading } = useAuthStore();
  const { theme } = useThemeStore(); // <- get current theme
  const [showEditor, setShowEditor] = useState(false);

  if (!user) return null;

  // background colors
  const cardBorder = theme === "dark" ? "border-[#444242]" : "border-[#E9E2CE]";
  const textPrimary = theme === "dark" ? "text-[#EDEDED]" : "text-[#2B2B2B]";
  const textSecondary = theme === "dark" ? "text-[#A8A49D]" : "text-[#6F6652]";
  const textAccent = theme === "dark" ? "text-[#FA9500]" : "text-[#7C6A0A]";
  const inputBorder =
    theme === "dark" ? "border-[#3B3B3B]" : "border-[#EADFCB]";

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully 👋");
    } catch {
      toast.error("Logout failed. Try again.");
    }
  };

  return (
    <section className='min-h-screen w-full flex justify-center py-16 px-4'>
      <motion.div
        {...fadeUp(0)}
        className={`relative w-full max-w-5xl rounded-3xl p-6 sm:p-10 border ${cardBorder} shadow-lg`}>
        {/* Logout */}
        <button
          disabled={isLoading}
          onClick={handleLogout}
          className={`absolute top-5 right-5 px-4 py-2 text-xs sm:text-sm ${
            theme === "dark"
              ? "bg-[#3B3B3B] border-[#555] text-white"
              : "bg-[#FFF5EB] border-[#EADFCB]"
          } text-[#6F6652] rounded-lg hover:bg-[#FA9500]/90 hover:text-white transition-all flex items-center gap-2 shadow-sm whitespace-nowrap`}>
          <LogOut size={16} />
          {isLoading ? "Logging out..." : "Logout"}
        </button>

        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className={`text-3xl sm:text-4xl font-extrabold ${textPrimary}`}>
            <span className='bg-gradient-to-r from-[#FA9500] to-[#EB6424] bg-clip-text text-transparent'>
              My Profile
            </span>
          </h1>
          <p className={`mt-2 ${textSecondary} text-[13px] sm:text-[15px]`}>
            Manage & showcase your personal details
          </p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "170px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className='h-[3px] bg-gradient-to-r from-[#FA9500] to-[#EB6424] rounded-full mx-auto mt-4'
          />
        </div>

        {/* Profile Intro */}
        <div className='flex flex-col sm:flex-row items-center gap-8 mb-12'>
          <motion.img
            {...fadeUp(0.1)}
            src={user?.profilePic || "/default-avatar.png"}
            alt={user.username}
            className='w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover border-[6px] border-[#E9E2CE] shadow-md'
          />

          <motion.div
            {...fadeUp(0.2)}
            className='flex flex-col w-full gap-3'>
            <div className='relative w-max'>
              <h2 className={`text-2xl sm:text-3xl font-bold ${textAccent}`}>
                {user.username}
              </h2>
              <span
                className={`absolute -top-3 -right-10 text-[9px] uppercase font-semibold px-2 py-[2px] rounded-full tracking-wide
                ${
                  user.role === "admin"
                    ? "bg-[#FA9500]/20 text-[#FA9500] border border-[#FA9500]"
                    : theme === "dark"
                    ? "bg-[#555] text-[#A8A49D] border border-[#777]"
                    : "bg-[#E9E2CE] text-[#6F6652] border border-[#D5CDBD]"
                }`}>
                {user.role}
              </span>
            </div>

            <p
              className={`${
                theme === "dark" ? "text-[#CFCFCF]" : "text-[#5C4E3C]"
              } font-medium text-sm sm:text-base`}>
              {bio || "Just getting started in the digital world 🚀"}
            </p>

            {/* Buttons */}
            <div className='flex justify-end gap-3 mt-3'>
              <button
                onClick={() => setShowEditor(true)}
                className={`px-5 py-2.5 flex items-center gap-2 border ${inputBorder} rounded-xl ${textSecondary} hover:bg-[#FA9500] hover:text-white transition-all shadow-sm`}>
                <Edit size={16} /> Edit Profile
              </button>

              {user.role === "admin" && (
                <motion.button
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35, type: "spring" }}
                  onClick={() => {
                    toast.success("Redirecting...");
                    window.location.href = "/admin/dashboard";
                  }}
                  className='px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm bg-[#EB6424] text-white hover:bg-[#FA9500]'>
                  🧩 Dashboard
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
            theme={theme}
          />
          <InfoItem
            icon={<User />}
            label='Gender'
            value={user.gender === "boy" ? "Male" : "Female"}
            theme={theme}
          />
          <InfoItem
            icon={<LogIn />}
            label='Last Login'
            value={
              user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "N/A"
            }
            theme={theme}
          />
          <InfoItem
            icon={<Calendar />}
            label='Joined'
            value={new Date(user.createdAt).toDateString()}
            theme={theme}
          />
        </motion.div>

        {/* Social Links */}
        <motion.div {...fadeUp(0.35)}>
          <h3 className={`text-lg font-semibold ${textAccent} mb-3`}>
            Social Connections
          </h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <InfoItem
              icon={<BsGithub />}
              label='GitHub'
              value={github || "Not added"}
              theme={theme}
            />
            <InfoItem
              icon={<BsLinkedin />}
              label='LinkedIn'
              value={linkedin || "Not added"}
              theme={theme}
            />
            <InfoItem
              icon={<BsTwitterX />}
              label='X (Twitter)'
              value={twitter || "Not added"}
              theme={theme}
            />
            <InfoItem
              icon={<FiLink />}
              label='Portfolio'
              value={portfolio || "Not added"}
              theme={theme}
            />
          </div>
        </motion.div>
      </motion.div>

      {showEditor && (
        <EditProfileModal
          close={() => setShowEditor(false)}
          theme={theme}
        />
      )}
    </section>
  );
};

export default Profile;

const InfoItem = ({ icon, label, value, theme }) => (
  <div
    className={`flex items-center gap-4 p-4 rounded-xl border ${
      theme === "dark"
        ? "border-[#555] bg-[#3b3b4f]/75"
        : "border-[#EADFCB] bg-white/75"
    } shadow-sm hover:shadow-md`}>
    <span className='text-[#C67A0E] text-lg'>{icon}</span>
    <div>
      <p
        className={`text-[10px] font-semibold uppercase tracking-wide ${
          theme === "dark" ? "text-[#A8A49D]" : "text-[#8A7E6A]"
        }`}>
        {label}
      </p>
      <p
        className={`text-sm break-all ${
          theme === "dark" ? "text-[#EDEDED]" : "text-[#2A2A2A]"
        }`}>
        {value}
      </p>
    </div>
  </div>
);

/* ========== EDIT MODAL ========== */
const EditProfileModal = ({ close, theme }) => {
  const { bio, github, linkedin, twitter, portfolio, editProfile } =
    useProfileStore();
  const [form, setForm] = useState({
    bio: bio || "",
    github: github || "",
    linkedin: linkedin || "",
    twitter: twitter || "",
    portfolio: portfolio || "",
  });
  const [errors, setErrors] = useState({});
  const BIO_MAX = 160;
  const validateURL = (url) =>
    !url || /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(url);

  const handleChange = (field, value) => {
    const trimmedValue = value.trimStart();
    setForm({ ...form, [field]: trimmedValue });
    if (field === "bio") {
      setErrors({
        ...errors,
        bio:
          trimmedValue.length > BIO_MAX
            ? `Max ${BIO_MAX} characters allowed`
            : "",
      });
    } else {
      setErrors({
        ...errors,
        [field]: !validateURL(value) ? "Invalid URL format" : "",
      });
    }
  };

  const clearField = (field) => {
    setForm({ ...form, [field]: "" });
    setErrors({ ...errors, [field]: "" });
  };

  const handleSave = async () => {
    if (Object.values(errors).some((err) => err)) {
      toast.error("Please fix errors before saving!");
      return;
    }
    const res = await editProfile(form);
    if (!res.success) return toast.error(res.message);
    toast.success("Profile updated successfully ⚡");
    close();
  };

  const inputField = (label, key, type = "text") => (
    <div>
      <div className='relative'>
        <input
          type={type}
          placeholder={label}
          value={form[key]}
          onChange={(e) => handleChange(key, e.target.value)}
          className={`w-full border rounded-lg px-3 py-2 text-sm outline-none ${
            theme === "dark"
              ? "bg-[#2F2F2F] border-[#555] text-[#EDEDED] focus:ring-2 focus:ring-[#EB6424]/40"
              : "bg-[#FFFCF7] border-[#EADFCB] text-[#2A2A2A] focus:ring-2 focus:ring-[#EB6424]/40"
          }`}
        />
        {form[key] && (
          <FiXCircle
            onClick={() => clearField(key)}
            className='absolute right-2 top-2.5 cursor-pointer text-red-500 text-lg'
          />
        )}
      </div>
      {errors[key] && (
        <p className='text-[11px] text-red-600 mt-1'>{errors[key]}</p>
      )}
    </div>
  );

  return (
    <div className='fixed inset-0 bg-black/40 flex justify-center items-center p-4 backdrop-blur-sm z-50'>
      <div
        className={`w-full max-w-md rounded-2xl border p-6 space-y-4 shadow-xl animate-fadeIn ${
          theme === "dark"
            ? "bg-[#2A2A2A] border-[#555]"
            : "bg-white border-[#E9E2CE]"
        }`}>
        <h2
          className={`text-lg font-bold ${
            theme === "dark" ? "text-[#FA9500]" : "text-[#7C6A0A]"
          }`}>
          Edit Profile
        </h2>

        {/* BIO TEXTAREA */}
        <div>
          <textarea
            rows={3}
            placeholder='Bio (max 160 characters)'
            value={form.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 text-sm outline-none resize-none ${
              theme === "dark"
                ? "bg-[#2F2F2F] border-[#555] text-[#EDEDED] focus:ring-2 focus:ring-[#EB6424]/40"
                : "bg-[#FFFCF7] border-[#EADFCB] text-[#2A2A2A] focus:ring-2 focus:ring-[#EB6424]/40"
            }`}
          />
          <div className='flex justify-between text-[11px] mt-1'>
            <span
              className={`${
                errors.bio
                  ? "text-red-600"
                  : theme === "dark"
                  ? "text-[#A8A49D]"
                  : "text-gray-500"
              }`}>
              {errors.bio || ""}
            </span>
            <span
              className={`${
                theme === "dark" ? "text-[#A8A49D]" : "text-gray-500"
              }`}>
              {form.bio.length}/{BIO_MAX}
            </span>
          </div>
        </div>

        {inputField("GitHub URL", "github")}
        {inputField("LinkedIn URL", "linkedin")}
        {inputField("Twitter URL", "twitter")}
        {inputField("Portfolio URL", "portfolio")}

        <div className='flex justify-end gap-3 pt-2'>
          <button
            onClick={close}
            className='px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300 transition-all'>
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={Object.values(errors).some((e) => e)}
            className='px-4 py-2 text-sm rounded-lg bg-[#FA9500] text-white disabled:opacity-60 hover:bg-[#EB7C00] transition-all'>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
