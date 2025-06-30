import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Shield, Palette } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const Settings = () => {
  const { dietaryPreferences, updateDietaryPreference } = useApp();

  const settingsSections = [
    {
      icon: User,
      title: 'Dietary Preferences',
      description: 'Customize your dietary restrictions and preferences',
      content: (
        <div className="space-y-4">
          {dietaryPreferences.map((preference) => (
            <div key={preference.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Label htmlFor={preference.id} className="font-medium">
                    {preference.name}
                  </Label>
                  {preference.enabled && (
                    <Badge variant="secondary" className="text-xs">
                      Active
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">{preference.description}</p>
              </div>
              <Switch
                id={preference.id}
                checked={preference.enabled}
                onCheckedChange={(checked) => updateDietaryPreference(preference.id, checked)}
              />
            </div>
          ))}
        </div>
      )
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Manage your notification preferences',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Recipe Recommendations</Label>
              <p className="text-sm text-gray-600">Get notified about new recipe suggestions</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Meal Plan Reminders</Label>
              <p className="text-sm text-gray-600">Reminders for your planned meals</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Shopping List Updates</Label>
              <p className="text-sm text-gray-600">Notifications when your shopping list changes</p>
            </div>
            <Switch />
          </div>
        </div>
      )
    },
    {
      icon: Shield,
      title: 'Privacy & Data',
      description: 'Control your data and privacy settings',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Save Search History</Label>
              <p className="text-sm text-gray-600">Help improve recipe recommendations</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Anonymous Analytics</Label>
              <p className="text-sm text-gray-600">Help us improve SmartChef</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Personalized Ads</Label>
              <p className="text-sm text-gray-600">Show relevant cooking content</p>
            </div>
            <Switch />
          </div>
        </div>
      )
    },
    {
      icon: Palette,
      title: 'Appearance',
      description: 'Customize the look and feel of SmartChef',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Dark Mode</Label>
              <p className="text-sm text-gray-600">Switch to dark theme</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Compact View</Label>
              <p className="text-sm text-gray-600">Show more recipes per row</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Recipe Cards Animation</Label>
              <p className="text-sm text-gray-600">Enable smooth animations</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-2 mb-4">
          <SettingsIcon className="w-8 h-8 text-emerald-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Settings</h1>
        </div>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Customize your SmartChef experience to match your preferences
        </p>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section, index) => {
          const Icon = section.icon;
          
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon className="w-5 h-5 text-emerald-600" />
                    <span>{section.title}</span>
                  </CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {section.content}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* App Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>About SmartChef</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-600">AI</div>
                <div className="text-sm text-gray-600">Powered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-600">1000+</div>
                <div className="text-sm text-gray-600">Recipes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-600">6</div>
                <div className="text-sm text-gray-600">Diet Types</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-600">24/7</div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
            </div>
            
            <Separator />
            
            <div className="text-center text-sm text-gray-600">
              <p>SmartChef v1.0.0 - Made with ❤️ for food lovers</p>
              <p className="mt-2">
                <a href="#" className="text-emerald-600 hover:underline">Privacy Policy</a>
                {' • '}
                <a href="#" className="text-emerald-600 hover:underline">Terms of Service</a>
                {' • '}
                <a href="#" className="text-emerald-600 hover:underline">Support</a>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Settings;