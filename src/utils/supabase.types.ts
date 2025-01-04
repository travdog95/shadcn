export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      assignments: {
        Row: {
          conductingId: number | null
          created_at: string
          id: number
          month: number | null
          year: number | null
        }
        Insert: {
          conductingId?: number | null
          created_at?: string
          id?: number
          month?: number | null
          year?: number | null
        }
        Update: {
          conductingId?: number | null
          created_at?: string
          id?: number
          month?: number | null
          year?: number | null
        }
        Relationships: []
      }
      callings: {
        Row: {
          calling: string | null
          created_at: string
          id: number
          mdID: string | null
          organization: string | null
          organizationId: number | null
        }
        Insert: {
          calling?: string | null
          created_at?: string
          id?: number
          mdID?: string | null
          organization?: string | null
          organizationId?: number | null
        }
        Update: {
          calling?: string | null
          created_at?: string
          id?: number
          mdID?: string | null
          organization?: string | null
          organizationId?: number | null
        }
        Relationships: []
      }
      callingworkshopitems: {
        Row: {
          callingId: number | null
          created_at: string
          currentOfficerId: number | null
          id: number
          note: string | null
          releaseStatus: string | null
          sustainStatus: string | null
        }
        Insert: {
          callingId?: number | null
          created_at?: string
          currentOfficerId?: number | null
          id?: number
          note?: string | null
          releaseStatus?: string | null
          sustainStatus?: string | null
        }
        Update: {
          callingId?: number | null
          created_at?: string
          currentOfficerId?: number | null
          id?: number
          note?: string | null
          releaseStatus?: string | null
          sustainStatus?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "callingworkshopitems_callingId_fkey"
            columns: ["callingId"]
            isOneToOne: false
            referencedRelation: "callings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "callingworkshopitems_currentOfficerId_fkey"
            columns: ["currentOfficerId"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      files: {
        Row: {
          created_at: string
          destination: string | null
          encoding: string | null
          filename: string | null
          id: number
          importDate: string | null
          metadata: Json | null
          mimetype: string | null
          numberOfRecords: number | null
          originalname: string | null
          size: number | null
          uploadDate: string | null
        }
        Insert: {
          created_at?: string
          destination?: string | null
          encoding?: string | null
          filename?: string | null
          id?: number
          importDate?: string | null
          metadata?: Json | null
          mimetype?: string | null
          numberOfRecords?: number | null
          originalname?: string | null
          size?: number | null
          uploadDate?: string | null
        }
        Update: {
          created_at?: string
          destination?: string | null
          encoding?: string | null
          filename?: string | null
          id?: number
          importDate?: string | null
          metadata?: Json | null
          mimetype?: string | null
          numberOfRecords?: number | null
          originalname?: string | null
          size?: number | null
          uploadDate?: string | null
        }
        Relationships: []
      }
      membercallings: {
        Row: {
          callingId: number | null
          created_at: string
          id: number
          memberId: number | null
          releaseDate: string | null
          setApart: boolean | null
          sustainDate: string | null
        }
        Insert: {
          callingId?: number | null
          created_at?: string
          id?: number
          memberId?: number | null
          releaseDate?: string | null
          setApart?: boolean | null
          sustainDate?: string | null
        }
        Update: {
          callingId?: number | null
          created_at?: string
          id?: number
          memberId?: number | null
          releaseDate?: string | null
          setApart?: boolean | null
          sustainDate?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "membercallings_callingId_fkey"
            columns: ["callingId"]
            isOneToOne: false
            referencedRelation: "callings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "membercallings_memberId_fkey"
            columns: ["memberId"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          address1: string | null
          address2: string | null
          birthDate: string | null
          contactForTithing: boolean | null
          created_at: string
          email: string | null
          firstName: string | null
          gender: string | null
          hasMovedOut: boolean | null
          id: number
          isBishopricMember: boolean | null
          isServingMission: boolean | null
          isWillingToAcceptCalling: boolean | null
          isWillingToPray: boolean | null
          isWillingToSpeak: boolean | null
          lastName: string | null
          lastPrayerDate: string | null
          marriageDate: string | null
          mdID: string | null
          memberId: number | null
          middleName: string | null
          moveInDate: string | null
          note: string | null
          phone: string | null
          preferredName: string | null
          prefferedNameURL: string | null
          priesthoodOffice: string | null
          suffix: string | null
          templeRecommendExpirationDate: string | null
          templeRecommendStatus: string | null
          templeRecommendType: string | null
        }
        Insert: {
          address1?: string | null
          address2?: string | null
          birthDate?: string | null
          contactForTithing?: boolean | null
          created_at?: string
          email?: string | null
          firstName?: string | null
          gender?: string | null
          hasMovedOut?: boolean | null
          id?: number
          isBishopricMember?: boolean | null
          isServingMission?: boolean | null
          isWillingToAcceptCalling?: boolean | null
          isWillingToPray?: boolean | null
          isWillingToSpeak?: boolean | null
          lastName?: string | null
          lastPrayerDate?: string | null
          marriageDate?: string | null
          mdID?: string | null
          memberId?: number | null
          middleName?: string | null
          moveInDate?: string | null
          note?: string | null
          phone?: string | null
          preferredName?: string | null
          prefferedNameURL?: string | null
          priesthoodOffice?: string | null
          suffix?: string | null
          templeRecommendExpirationDate?: string | null
          templeRecommendStatus?: string | null
          templeRecommendType?: string | null
        }
        Update: {
          address1?: string | null
          address2?: string | null
          birthDate?: string | null
          contactForTithing?: boolean | null
          created_at?: string
          email?: string | null
          firstName?: string | null
          gender?: string | null
          hasMovedOut?: boolean | null
          id?: number
          isBishopricMember?: boolean | null
          isServingMission?: boolean | null
          isWillingToAcceptCalling?: boolean | null
          isWillingToPray?: boolean | null
          isWillingToSpeak?: boolean | null
          lastName?: string | null
          lastPrayerDate?: string | null
          marriageDate?: string | null
          mdID?: string | null
          memberId?: number | null
          middleName?: string | null
          moveInDate?: string | null
          note?: string | null
          phone?: string | null
          preferredName?: string | null
          prefferedNameURL?: string | null
          priesthoodOffice?: string | null
          suffix?: string | null
          templeRecommendExpirationDate?: string | null
          templeRecommendStatus?: string | null
          templeRecommendType?: string | null
        }
        Relationships: []
      }
      organizations: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      prayers: {
        Row: {
          created_at: string
          date: string | null
          id: number
          memberId: number | null
          prayerType: string | null
          sacramentMeetingId: number | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: number
          memberId?: number | null
          prayerType?: string | null
          sacramentMeetingId?: number | null
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: number
          memberId?: number | null
          prayerType?: string | null
          sacramentMeetingId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prayers_memberId_fkey"
            columns: ["memberId"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prayers_sacramentMeetingId_fkey"
            columns: ["sacramentMeetingId"]
            isOneToOne: false
            referencedRelation: "sacramentmeetings"
            referencedColumns: ["id"]
          },
        ]
      }
      sacramentmeetings: {
        Row: {
          created_at: string
          date: string
          id: number
          mdID: string | null
          note: string | null
          theme: string | null
        }
        Insert: {
          created_at?: string
          date: string
          id?: number
          mdID?: string | null
          note?: string | null
          theme?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          id?: number
          mdID?: string | null
          note?: string | null
          theme?: string | null
        }
        Relationships: []
      }
      talks: {
        Row: {
          created_at: string
          date: string | null
          id: number
          memberId: number | null
          rank: number | null
          sacramentMeetingId: number | null
          talkType: string | null
          topic: string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: number
          memberId?: number | null
          rank?: number | null
          sacramentMeetingId?: number | null
          talkType?: string | null
          topic?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: number
          memberId?: number | null
          rank?: number | null
          sacramentMeetingId?: number | null
          talkType?: string | null
          topic?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "talks_memberId_fkey"
            columns: ["memberId"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "talks_sacramentMeetingId_fkey"
            columns: ["sacramentMeetingId"]
            isOneToOne: false
            referencedRelation: "sacramentmeetings"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          calling: string | null
          callingId: number | null
          created_at: string
          email: string | null
          firstName: string | null
          id: number
          isAdmin: boolean | null
          isBishopricMember: boolean | null
          isCommunicationSpecialist: boolean | null
          lastName: string | null
          middleName: string | null
          password: string | null
          phoneNumber: string | null
          refreshToken: string | null
        }
        Insert: {
          calling?: string | null
          callingId?: number | null
          created_at?: string
          email?: string | null
          firstName?: string | null
          id?: number
          isAdmin?: boolean | null
          isBishopricMember?: boolean | null
          isCommunicationSpecialist?: boolean | null
          lastName?: string | null
          middleName?: string | null
          password?: string | null
          phoneNumber?: string | null
          refreshToken?: string | null
        }
        Update: {
          calling?: string | null
          callingId?: number | null
          created_at?: string
          email?: string | null
          firstName?: string | null
          id?: number
          isAdmin?: boolean | null
          isBishopricMember?: boolean | null
          isCommunicationSpecialist?: boolean | null
          lastName?: string | null
          middleName?: string | null
          password?: string | null
          phoneNumber?: string | null
          refreshToken?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
