-- Create event_configs table
-- Stores the selected template and customized event configuration for each client user

CREATE TABLE IF NOT EXISTS event_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  template_id TEXT NOT NULL,
  config JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one event config per user per tenant
  UNIQUE(tenant_id, user_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_event_configs_tenant_id ON event_configs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_event_configs_user_id ON event_configs(user_id);
CREATE INDEX IF NOT EXISTS idx_event_configs_template_id ON event_configs(template_id);

-- Enable Row Level Security
ALTER TABLE event_configs ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own event config
CREATE POLICY "Users can view own event config"
  ON event_configs FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own event config
CREATE POLICY "Users can insert own event config"
  ON event_configs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own event config
CREATE POLICY "Users can update own event config"
  ON event_configs FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own event config
CREATE POLICY "Users can delete own event config"
  ON event_configs FOR DELETE
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_event_configs_updated_at
  BEFORE UPDATE ON event_configs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
