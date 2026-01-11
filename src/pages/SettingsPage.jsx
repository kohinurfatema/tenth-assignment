import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';
import { FaBell, FaPalette, FaShieldAlt, FaGlobe, FaTrash, FaMoon, FaSun } from 'react-icons/fa';

const SettingsPage = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    challengeReminders: true,
    weeklyDigest: false,
    marketingEmails: false,
    language: 'en',
    timezone: 'UTC',
    profileVisibility: 'public',
    showActivity: true,
  });
  const [saving, setSaving] = useState(false);

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    toast.success('Settings saved successfully!');
    setSaving(false);
  };

  const handleDeleteAccount = () => {
    toast.error('Account deletion is disabled in demo mode');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-base-content/60 mt-1">Manage your account preferences</p>
      </div>

      {/* Appearance */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <FaPalette className="text-xl text-primary" />
            <h2 className="card-title">Appearance</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-base-content/60">Choose your preferred theme</p>
              </div>
              <button onClick={toggleTheme} className="btn btn-outline gap-2">
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <FaBell className="text-xl text-primary" />
            <h2 className="card-title">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-base-content/60">Receive updates via email</p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={settings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
              />
            </div>

            <div className="divider my-0"></div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Challenge Reminders</p>
                <p className="text-sm text-base-content/60">Get reminded about active challenges</p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={settings.challengeReminders}
                onChange={() => handleToggle('challengeReminders')}
              />
            </div>

            <div className="divider my-0"></div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Digest</p>
                <p className="text-sm text-base-content/60">Receive weekly summary of your progress</p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={settings.weeklyDigest}
                onChange={() => handleToggle('weeklyDigest')}
              />
            </div>

            <div className="divider my-0"></div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Marketing Emails</p>
                <p className="text-sm text-base-content/60">Receive news and promotional content</p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={settings.marketingEmails}
                onChange={() => handleToggle('marketingEmails')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Privacy */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <FaShieldAlt className="text-xl text-primary" />
            <h2 className="card-title">Privacy</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Profile Visibility</p>
                <p className="text-sm text-base-content/60">Control who can see your profile</p>
              </div>
              <select
                className="select select-bordered w-40"
                value={settings.profileVisibility}
                onChange={(e) => handleChange('profileVisibility', e.target.value)}
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div className="divider my-0"></div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Activity Status</p>
                <p className="text-sm text-base-content/60">Let others see when you are active</p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={settings.showActivity}
                onChange={() => handleToggle('showActivity')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Language & Region */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <FaGlobe className="text-xl text-primary" />
            <h2 className="card-title">Language & Region</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Language</p>
                <p className="text-sm text-base-content/60">Select your preferred language</p>
              </div>
              <select
                className="select select-bordered w-40"
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <div className="divider my-0"></div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Timezone</p>
                <p className="text-sm text-base-content/60">Set your local timezone</p>
              </div>
              <select
                className="select select-bordered w-40"
                value={settings.timezone}
                onChange={(e) => handleChange('timezone', e.target.value)}
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="PST">Pacific Time</option>
                <option value="GMT">GMT</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card bg-base-100 shadow-lg border-2 border-error/20">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <FaTrash className="text-xl text-error" />
            <h2 className="card-title text-error">Danger Zone</h2>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-base-content/60">Permanently delete your account and all data</p>
            </div>
            <button onClick={handleDeleteAccount} className="btn btn-error btn-outline">
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={handleSave} className={"btn btn-primary btn-lg " + (saving ? "loading" : "")}>
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
